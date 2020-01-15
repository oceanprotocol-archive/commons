import React, { PureComponent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { History } from 'history'
import { Market } from '../../context'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'

import meta from '../../data/meta.json'
import Spinner from '../../components/atoms/Spinner'
import Content from '../../components/atoms/Content'
import Markdown from '../../components/atoms/Markdown'
import DataAssetsLatest from '../../components/organisms/DataAssetsLatest'
import UnionTeaser from '../../components/organisms/UnionTeaser'
import BountiesList from '../../components/organisms/BountiesList'
import Button from '../../components/atoms/Button'
import Search from './Search'
import FixedSearch from './FixedSearch'
import { getDataUnions } from '../../box'
// import withTracker from '../../hoc/withTracker'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

interface HomeProps {
    history: History
}

interface HomeState {
    loadingUnions: boolean
    unions: Array<any>
    search?: string
    fixedSearch: boolean
    showSearch: boolean,
    descriptions: Array<any>
}

class Home extends PureComponent<HomeProps, HomeState> {
    public static contextType = Market

    public state = {
        loadingUnions: true,
        unions: [],
        fixedSearch: false,
        showSearch: false,
        descriptions: [
            { description: meta.description },
            { description: meta.description },
            { description: meta.description }
        ]

    }

    public searchAssets = (
        search: string,
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${search}`)
    }

    handleScroll = () => {
        if(window.pageYOffset > 230) {
            this.setState({fixedSearch: true})
        } else {
            this.setState({fixedSearch: false})
        }
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        getDataUnions().then((unions: Array<any>) => this.setState({ loadingUnions: false, unions }))
    }

    public render() {
        const { account } = this.context
        const { fixedSearch, loadingUnions, unions, descriptions } = this.state;
        const results:any = [];
        return (
            <Route
                title={meta.title}
                className={styles.home}
            >
                <video autoPlay muted loop className={styles.bgVideo}>
                    <source src="/home-bg.mp4" type="video/mp4" />
                </video>
                <Content>
                    <Slider autoplay="3000" className={`slider ${styles.homeSlider}`}>
                      {descriptions.map((desc, index) => <div key={index}>
                      <Markdown
                          text={desc.description}
                          className={styles.description}
                      />
                      </div>)}
                    </Slider>
                </Content>
                <Content>
                    <div className={styles.mainButtons}>
                        <div>
                            <Search searchAssets={this.searchAssets} />
                        </div>
                        <Link to="/topics">Browse by topic →</Link>
                    </div>
                    {fixedSearch && (
                        <FixedSearch searchAssets={this.searchAssets} history={this.props.history}/>
                    )}
                </Content>

                <Content wide>
                {account ? (
                    <h2 className={styles.title}>Your Data Challenges</h2>
                ):(
                    <h2 className={styles.title}>Data Challenges You Can Contribute</h2>
                )}
                    <BountiesList issuer={account}/>
                </Content>

                <Content wide>
                    <h2 className={styles.title}>Research Groups You Might Have Interest</h2>
                    {loadingUnions ? (
                            <Spinner />
                        ):(unions.length > 0 ? (unions.map((union: any) => (
                            <UnionTeaser
                                key={union.legalName.value.toLowerCase().replace(/\s/g,'-')}
                                union={union}
                            />
                        ))):(
                            <h3>No Data Unions found</h3>
                        ))
                    }
                </Content>

                <Content wide>
                    <DataAssetsLatest />
                </Content>
            </Route>
        )
    }
}

// export default withTracker(Home)
export default Home
