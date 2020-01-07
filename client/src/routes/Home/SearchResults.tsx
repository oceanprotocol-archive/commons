import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import Form from '../../components/atoms/Form/Form'
import Input from '../../components/atoms/Form/Input'
import AssetResult from '../../components/molecules/AssetResult'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
    results: any,
    cleanupSearch: () => void
}

interface SearchResultsState {
}

export default class SearchResults extends PureComponent<SearchResultsProps, SearchResultsState> {


    public render() {
        const { results, cleanupSearch } = this.props

        return (
            <>
            {results.length > 0 && (
                    <div id="Modal" className={styles.searchModal}>
                        <div className={styles.searchModalHeader}>
                        <h3>Results</h3>
                        <span id="close" onClick={() => {cleanupSearch()}}>X</span>
                        </div>
                        <div className={styles.searchModalBody}>
                        {results.map((result: any) => (
                            <AssetResult asset={result} />
                        ))}
                        </div>
                    </div>
                )
            }
            </>
        )
    }
}
