import React, { PureComponent } from 'react'
import Spinner from '../../components/atoms/Spinner'
import Route from '../../components/templates/Route'
import Content from '../../components/atoms/Content'
import Button from '../../components/atoms/Button'
import { ipfsNodeUri } from '../../config'
import { getBounties } from '../../graphql'
import moment from 'moment'
import styles from './Bounty.module.scss'
import { User } from '../../context'


interface IBountyState {
    isLoading: boolean,
    results: any
}

class Bounty extends PureComponent<any, IBountyState> {

    public static contextType = User

    state: IBountyState = {
        isLoading: true,
        results: []
    }

    componentDidMount() {
        getBounties(this.props.match.params.bountyId).then((rs) => {
            if(rs) {
                console.log(rs[0])
                this.setState({ results: rs[0], isLoading: false })
            }
        }).catch((err) => {
            console.log('err', err)
            this.setState({ results: [], isLoading: false })
        });
    }


    public render() {
        const { account } = this.context
        const { isLoading, results } = this.state

        return (
            <Route title="Bounty">
                {isLoading ? (
                    <Spinner message="Loading..." />
                ) : (
                    <Content>
                        { results && results.ipfsData ? (
                            <div className={styles.bounty}>
                                <h2>{results.ipfsData.payload.title}</h2>
                                <p>{results.ipfsData.payload.description}</p>
                                { results.ipfsData.payload.categories.map((cat: string) => (<span className={styles.tag} key={cat}>{cat}</span>)) }
                                <div className={styles.info}>
                                    <span><b>Reward:</b> {results.ipfsData.payload.fulfillmentAmount} TOKEN</span>
                                    <span><b>Difficulty:</b> {results.ipfsData.payload.difficulty}</span>
                                    <span><b>Deadline:</b> {moment(results.ipfsData.payload.deadline).format('DD/MM/YYYY')}</span>
                                    <span><b>Creator:</b> {results.creator}</span>
                                    <span><b>Token:</b> {results.token}</span>
                                    <div className={styles.centeredWrapper}>
                                        <div className={styles.fileWrap}>
                                            <ul className={styles.file}>
                                                <li>{results.ipfsData.payload.ipfsFilename}</li>
                                            </ul>
                                            <a className={styles.button} href={`${ipfsNodeUri}/ipfs/${results.ipfsData.payload.ipfsHash}/${results.ipfsData.payload.ipfsFilename}`} target="_blank">Schema</a>
                                        </div>
                                        <div className={styles.fileWrap}>
                                        <ul className={styles.file}>
                                                <li></li>
                                            </ul>
                                            <a className={styles.button} href={results.ipfsData.payload.webReferenceURL} target="_blank">Attachment</a>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.centeredWrapper}>
                                    <a className={styles.button} onClick={() => {}}>Contribute</a>
                                    { account === results.issuers[0] &&
                                        (<a className={styles.button} onClick={() => {}}>Publish</a>)
                                    }
                                </div>
                            </div>
                        ):(
                            <p>Bounty does not exist.</p>
                        )}
                    </Content>)
                }
            </Route>
        )
    }
}

export default Bounty
