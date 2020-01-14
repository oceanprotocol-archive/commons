import React, { PureComponent } from 'react'
import { ToastMessage } from 'rimble-ui';
import { Logger } from '@oceanprotocol/squid'
import { History, Location } from 'history'
import queryString from 'query-string'
import Spinner from '../../components/atoms/Spinner'
import UnionHead from './UnionHead'
import { Market } from '../../context'
import AssetTeaser from '../molecules/AssetTeaser'
import Pagination from '../../components/molecules/Pagination'
import styles from './Channel.module.scss'
import Content from '../../components/atoms/Content'
import CategoryImage from '../atoms/CategoryImage'
import { IUnion, getDataUnion, getFollowingList, joinDataUnion } from '../../box'

interface UnionDetail {
    union: IUnion
    followers: number
}

interface UnionProps {
    history: History
    location: Location
    match: {
        params: {
            channel: string
        }
    }
}

interface UnionState {
    unionAddress: string
    unionDetail?: UnionDetail
    results: any[]
    totalResults: number
    offset: number
    totalPages: number
    currentPage: number
    isLoading: boolean
    following: boolean
    processing: boolean
    success: boolean
    error: string
    box?: any
    space?: any
}

export default class Union extends PureComponent<UnionProps, UnionState> {

    public state = {
        unionAddress: '',
        unionDetail: undefined as any,
        results: [],
        totalResults: 0,
        offset: 25,
        totalPages: 1,
        currentPage: 1,
        isLoading: true,
        following: false,
        processing: false,
        success: false,
        error: '',
        box: undefined,
        space: undefined
    }

    public async componentDidMount() {
        const { search } = this.props.location
        const { address } = queryString.parse(search)
        if (address) {
            const unionAddress = decodeURIComponent(`${address}`)
            this.setState({ unionAddress })
            await this.fetchUnion(unionAddress)
            this.getUnionAssets()
            this.isFollowing()
        }
    }

    private fetchUnion = async (unionAddress: string) => {
        const unionDetail: UnionDetail = await getDataUnion(unionAddress)
        this.setState({ unionDetail })
    }

    private isFollowing = async () => {
        const { unionAddress } = this.state
        const { account } = this.context
        if (account) {
            const followingList = await getFollowingList(account)
            const foundUnion = followingList.find((f: any) => f.message.identifier.value === unionAddress)
            this.setState({ following: !!foundUnion })
        }
    }

    private getUnionAssets = async () => {
        const { ocean, aquarius } = this.context
        const { unionDetail, offset, currentPage } = this.state
        if (unionDetail) {
            const { union } = unionDetail

            // const tag = union.alternateName.value
            const tag = "ai-for-good"

            const searchQuery = {
                offset,
                page: currentPage,
                query: {
                    tags: [ tag ]
                },
                sort: {
                    created: -1
                }
            }

            try {
                const search = ocean ? 
                    await ocean.assets.query(searchQuery)
                    :await aquarius.queryMetadata(searchQuery)
                this.setState({
                    results: search.results,
                    totalResults: search.totalResults,
                    totalPages: search.totalPages,
                    isLoading: false
                })
            } catch (error) {
                Logger.error(error.message)
                this.setState({ isLoading: false })
            }
        }
    }

    public followUnion = async () => {
        const { unionDetail, unionAddress } = this.state
        const { ocean, wallet } = this.context
        if (!ocean) {
            this.setState({ error: 'Please connect to your wallet!' })
            setTimeout(() => this.setState({ error: '' }), 5000)
        } else {
            
            if (!this.state.box || !this.state.space) {
                setTimeout(() => this.setState({ processing: false }), 5000)
                wallet.toggleModal()
                const rs = await wallet.openBox()
                wallet.toggleModal()
                this.setState({ box: rs.box, space: rs.space })
            }
            try {
                this.setState({ processing: true })
                let { box, space } = this.state
                // await joinDataUnion(box, space, unionAddress)
                await joinDataUnion(box, space, unionDetail.union)
                this.setState({ following: true, processing: false, success: true })
                this.fetchUnion(unionAddress)
                setTimeout(() => this.setState({ success: false }), 5000)
            } catch (error) {
                console.log(error)
                this.setState({ processing: false, error: error.message })
                setTimeout(() => this.setState({ error: '' }), 5000)
            }
        }
        
    }

    private handlePageClick = async (data: { selected: number }) => {
        // react-pagination starts counting at 0, we start at 1
        const toPage = data.selected + 1

        this.props.history.push({ search: `?page=${toPage}` })

        await this.setState({ currentPage: toPage, isLoading: true })
        await this.getUnionAssets()
    }

    public renderResults = () =>
        this.state.isLoading ? (
            <Spinner message="Searching..." />
        ) : this.state.results && this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map((asset: any) => (
                    <AssetTeaser key={asset.id} asset={asset} />
                ))}
            </div>
        ) : (
            <div>No data sets found.</div>
        )

    public render() {
        const { processing, success, error, unionDetail, following, totalPages, currentPage } = this.state
        const { account } = this.context

        this.isFollowing()

        return (
            <>
                {processing && (
                    <ToastMessage.Processing
                      className="toastMsg"
                      my={3}
                      message={"Processing"}
                    />
                )}
                {success && (
                    <ToastMessage.Success
                      className="toastMsg"
                      my={3}
                      message={"Data Union"}
                      secondaryMessage={"You have successfully joined this Data Union!"}
                    />
                )}
                {error && (
                    <ToastMessage.Failure
                      className="toastMsg"
                      my={3}
                      message={"Error!"}
                      secondaryMessage={error}
                    />
                )}
                {unionDetail ? (<UnionHead
                    unionDetail={unionDetail}
                    isModerator={account && account === unionDetail.union.founder.identifier.value}
                    following={following}
                    followUnion={() => this.followUnion()}
                    image={<CategoryImage header category={''} />}
                >
                    <Content wide>
                        {this.renderResults()}

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageClick={this.handlePageClick}
                        />
                    </Content>
                </UnionHead>):(
                    <Content>
                        <h2>Not Found</h2>
                    </Content>
                )}
            </>
        )
    }
}

Union.contextType = Market
