import React, { PureComponent } from 'react'
import AssetResult from '../../components/molecules/AssetResult'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
    results: any,
    cleanupSearch: () => void,
    fixed?: boolean
}

interface SearchResultsState {
}

export default class SearchResults extends PureComponent<SearchResultsProps, SearchResultsState> {


    public render() {
        const { results, cleanupSearch, fixed } = this.props

        return (
            <div className={fixed ? styles.fixedResults : undefined}>
            {results.length > 0 && (
                    <div id="Modal" className={styles.searchModal}>
                        <div className={styles.searchModalHeader}>
                        <h3>Results</h3>
                        <span id="close" onClick={() => {cleanupSearch()}}>X</span>
                        </div>
                        <div className={styles.searchModalBody}>
                        {results.map((result: any) => (
                            <AssetResult asset={result} key={result.id}/>
                        ))}
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}
