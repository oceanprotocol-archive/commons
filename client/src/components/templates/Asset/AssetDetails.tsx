import React, { Component } from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@oceanprotocol/squid'
import shortid from 'shortid'
import Markdown from '../../atoms/Markdown'
import CategoryLink from '../../atoms/CategoryLink'
import Button from '../../atoms/Button'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'
import AssetLinks from './AssetLinks'
import Report from './Report'
// import { allowPricing } from '../../../config'
import Web3 from 'web3'
// import ThreeBoxComments from '3box-comments-react'
import BondingCurve from '../BondingCurve'
import ProfileHover from 'profile-hover'
import { User, Market } from '../../../context'
import ThreeBoxComments from '3box-comments-react'

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

const AuthorItem = ({ name, value }: { name: string; value: string }) => (
    <li>
        <span className={styles.metaLabel}>
            <strong>{name}</strong>
        </span>
        <span className={styles.metaValue}><ProfileHover address={value} /></span>
    </li>
)

export default class AssetDetails extends Component<AssetDetailsProps, AssetDetailsState> {
    // const box = null
    // const myAddress = "0x2a0D29C819609Df18D8eAefb429AEC067269BBb6"

    public static contextType = Market

    public state = {
        active: 'general'
    }

    render(){
        const { metadata, ddo } = this.props;
        const { main, additionalInformation } = metadata
        const price = main.price && Web3.utils.fromWei(main.price.toString())
        const bondingCurveContractAddress = ''
        const contractArtifact = {}

        let cats = '', lang = ''
        if(additionalInformation && additionalInformation.categories) {
            cats = additionalInformation.categories.join()
        }
        if(additionalInformation && additionalInformation.inLanguage) {
            lang = additionalInformation.inLanguage
        }
        const metaFixed = [
            {
                name: 'Author',
                value: main.author,
                show: true
            },
            {
                name: 'License',
                value: main.license,
                show: true
            },
            {
                name: 'DID',
                value: ddo.id,
                show: true
            },
            {
                name: 'Type',
                value: main.type,
                show: true
            },
            {
                name: 'Language',
                value: lang,
                show: lang !== ''
            },
            {
                name: 'Categories',
                value: cats,
                show: cats !== ''
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
                {/*<h2 className={styles.copyrightHolder} title="Copyright Holder">
                {base.copyrightHolder}
                </h2>*/}
                {additionalInformation &&
                    additionalInformation.copyrightHolder && (
                    <h2
                        className={styles.copyrightHolder}
                        title="Copyright Holder"
                    >
                        {additionalInformation.copyrightHolder}
                    </h2>
                )}
                <div className={styles.metaPrimaryData}>
                <span
                title={`Date created, published on ${main.datePublished}`}
                >
                <Moment
                date={main.dateCreated}
                format="L"
                interval={0}
                />
                </span>

                {/*base.categories && (
                    <CategoryLink category={base.categories[0]} />
                )*/}
                {additionalInformation &&
                    additionalInformation.categories && (
                        <CategoryLink
                            category={additionalInformation.categories[0]}
                        />
                )}

                {main.files && datafilesLine(main.files)}
                </div>
                </aside>

                {/*base.description && (
                    <Markdown
                    text={base.description}
                    className={styles.description}
                    />
                )*/}

                {additionalInformation && additionalInformation.tags && (
                    <div className={styles.tags}>
                    {additionalInformation.tags.map(tag => (
                        <span>{tag}</span>
                    ))}
                    </div>
                )}

                {additionalInformation && additionalInformation.description && (
                    <Markdown
                        text={additionalInformation.description}
                        className={styles.description}
                    />
                )}



                <Report did={ddo.id} title={main.name} />

                <User.Consumer>
                {user => (<div className={styles.tabs}>
                <div className={styles.tabLinks}>
                <a href="#general" className={this.state.active === 'general' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'general'}) }>General</a>
                <a href="#download" className={this.state.active === 'donwload' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'download'}) }>Download</a>
                <a href="#links" className={this.state.active === 'links' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'links'}) }>Links</a>
                <a href="#bonding" className={this.state.active === 'bonding' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'bonding'}) }>Pricing</a>
                <a href="#comments" className={this.state.active === 'comments' ? styles.activetabLink : styles.tabLink} onClick={ () => this.setState({active: 'comments'}) }>Comments</a>
                </div>

                <div className={this.state.active === 'general' ? styles.activeTab : styles.tab} id="general">
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
                    .map(item => (item.name === 'Author' && user.account ?
                    (<AuthorItem
                        key={shortid.generate()}
                        name={item.name}
                        value={user.account}
                        />):(<MetaFixedItem
                            key={shortid.generate()}
                            name={item.name}
                            value={item.value}
                            />)
                        ))}
                        </ul>
                        </div>
                        </div>
                        <div className={this.state.active === 'download' ? styles.activeTab : styles.tab} id="download">
                        <AssetFilesDetails files={main.files ? main.files : []} ddo={ddo} />
                        </div>
                        <div className={this.state.active === 'links' ? styles.activeTab : styles.tab} id="links">
                        {additionalInformation && additionalInformation.links && (<AssetLinks files={additionalInformation.links ? additionalInformation.links : []} />)}
                        </div>
                        <div className={this.state.active === 'bonding' ? styles.activeTab : styles.tab} id="bonding">
                            <BondingCurve
                            contractAddress={bondingCurveContractAddress}
                            contractArtifact={contractArtifact}
                            defaultTab="bonding-curve"
                            onError={(error: any) => console.log('ERROR in bonding curve', error)}
                            onLoaded={() => console.log('BondingCurve loaded')}
                            />
                        </div>

                        <div className={this.state.active === 'comments' ? styles.activeTab : styles.tab} id="comments">
                        { user.box ? (<ThreeBoxComments
                            // required
                            spaceName='3boxtestcomments'
                            threadName='freshcomments'
                            adminEthAddr="0x2a0D29C819609Df18D8eAefb429AEC067269BBb6"
                            // Required props for auth A. & B.
                            box={user.box}
                            currentUserAddr={user.account}
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
                            />) : (<><p>Please login to 3box to share comments</p><Button>Login</Button></>) }
                        </div>
                        </div>
                        )}</User.Consumer>
                        </>
                )
    }

}
