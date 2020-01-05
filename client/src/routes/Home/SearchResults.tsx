import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import Form from '../../components/atoms/Form/Form'
import Input from '../../components/atoms/Form/Input'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
    results: any[]
}

interface SearchResultsState {
    visible: boolean
}

export default class SearchResults extends PureComponent<SearchResultsProps, SearchResultsState> {

    public state = {
        visible: false
    }

    public toggleResults = () => {
        this.setState({visible: !this.state.visible})
    }


    public render() {
        const { results } = this.props
        const { visible } = this.state

        return (
            <>
            {visible && (
                    <div id="Modal" className={styles.searchModal}>
                        <div className={styles.searchModalHeader}>
                        <h3>Results</h3>
                        <span id="close">X</span>
                        </div>
                        <div className={styles.searchModalBody}>
                        {results.map((result: any) => (
                            <div className={styles.message}>
                                <div className={styles.messageAvatar}>
                                        <img src="https://randomuser.me/api/portraits/women/57.jpg" alt="" />
                                </div>
                                <div className={styles.messageBody}>
                                    <p>New notification from kate morrison.</p>
                                    <small>20s ago</small>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )
            }
            </>
        )
    }
}
