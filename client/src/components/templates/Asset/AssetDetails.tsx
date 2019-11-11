import React, { Component } from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@oceanprotocol/squid'
import shortid from 'shortid'
import Markdown from '../../atoms/Markdown'
import CategoryLink from '../../atoms/CategoryLink'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'
import Report from './Report'
// import { allowPricing } from '../../../config'
import Web3 from 'web3'
// import ThreeBoxComments from '3box-comments-react'
import BondingCurve from '../BondingCurve'

interface AssetDetailsProps {
    metadata: MetaData
    ddo: DDO
}

interface AssetDetailsState {
    active: string
}

export function datafilesLine(files: File[]) {
    if (files.length === 1) {
        return <span>{files.length} data file</span>
    }
    return <span>{files.length} data files</span>
}

const MetaFixedItem = ({ name, value }: { name: string; value: string }) => (
    <li>
        <span className={styles.metaLabel}>
            <strong>{name}</strong>
        </span>
        <span className={styles.metaValue}>{value}</span>
    </li>
)

export default class AssetDetails extends Component<AssetDetailsProps, AssetDetailsState> {
    // const box = null
    // const myAddress = "0x2a0D29C819609Df18D8eAefb429AEC067269BBb6"

    public state = {
        active: 'general'
    }

    render(){
        const { metadata, ddo } = this. props;
        const { base } = metadata
        const price = base.price && Web3.utils.fromWei(base.price.toString())

        const bondingCurveContractAddress = ''

        const contractArtifact = {}

        const metaFixed = [
            {
                name: 'Author',
                value: base.author,
                show: true
            },
            {
                name: 'License',
                value: base.license,
                show: true
            },
            {
                name: 'DID',
                value: ddo.id,
                show: true
            },
            {
                name: 'Price',
                value: `${price} OCEAN`,
                show: price !== '0'
            }
        ]

        return (
            <>
            <aside className={styles.metaPrimary}>
            <h2 className={styles.copyrightHolder} title="Copyright Holder">
            {base.copyrightHolder}
            </h2>
            <div className={styles.metaPrimaryData}>
            <span
            title={`Date created, published on ${base.datePublished}`}
            >
            <Moment
            date={base.dateCreated}
            format="L"
            interval={0}
            />
            </span>

            {base.categories && (
                <CategoryLink category={base.categories[0]} />
            )}

            {base.files && datafilesLine(base.files)}
            </div>
            </aside>

            {base.description && (
                <Markdown
                text={base.description}
                className={styles.description}
                />
            )}

            <Report did={ddo.id} title={metadata.base.name} />

            <div className={styles.tabs}>
            <div className={styles.tabLinks}>
            <a href="#general" className={this.state.active=='general' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'general'}) }>General</a>
            <a href="#download" className={this.state.active=='donwload' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'download'}) }>Download</a>
            <a href="#bonding" className={this.state.active=='bonding' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'bonding'}) }>Bonding Curve</a>
            </div>

            <div className={this.state.active=='general' ? styles.activeTab : styles.tab} id="general">
            <div className={styles.metaFixed}>
            <h2
            className={styles.metaFixedTitle}
            title="This metadata can not be changed because it is used to generate the checksums for the DDO, and to encrypt the file urls."
            >
            Fixed Metadata
            </h2>
            <ul>
            {metaFixed
                .filter(item => item.show)
                .map(item => (
                    <MetaFixedItem
                    key={shortid.generate()}
                    name={item.name}
                    value={item.value}
                    />
                ))}
                </ul>
                </div>
                </div>
                <div className={this.state.active=='download' ? styles.activeTab : styles.tab} id="download">
                <AssetFilesDetails files={base.files ? base.files : []} ddo={ddo} />
                { /* <ThreeBoxComments
                    // required
                    spaceName='3boxtestcomments'
                    threadName='freshcomments'
                    adminEthAddr="0x2a0D29C819609Df18D8eAefb429AEC067269BBb6"
                    // Required props for auth A. & B.
                    box={box}
                    currentUserAddr={myAddress}
                    // Required prop for auth B.
                    loginFunction={() => console.log('Handle login')}
                    // Required prop for auth C.
                    ethereum={null}
                    // optional
                    members={false}
                    showCommentCount={10}
                    threadOpts={{}}
                    useHovers={true}
                    currentUser3BoxProfile={null}
                    userProfileURL={(address: string) => `https://mywebsite.com/user/${address}`}
                    /> */}
                    </div>
                    <div className={this.state.active=='bonding' ? styles.activeTab : styles.tab} id="bonding">
                    <BondingCurve
                    contractAddress={bondingCurveContractAddress}
                    contractArtifact={contractArtifact}
                    defaultTab="bonding-curve"
                    onError={(error: any) => console.log('ERROR in bonding curve', error)}
                    onLoaded={() => console.log('BondingCurve loaded')}
                    />
                    </div>
                    </div>
                    </>
                )
    }

}
