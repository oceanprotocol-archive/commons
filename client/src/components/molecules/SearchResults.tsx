import React from 'react'
import { Link } from 'react-router-dom'
import { DDO } from '@oceanprotocol/squid'
import Spinner from '../atoms/Spinner'
import AssetTeaser from './AssetTeaser'
import styles from './SearchResults.module.scss'

export interface SearchResultsState {
    results: DDO[]
    totalResults: number
    offset: number
    totalPages: number
    currentPage: number
    isLoading: boolean
}

export default function SearchResults({
    isLoading,
    results,
    simpleGrid
}: {
    isLoading: boolean
    results: DDO[]
    simpleGrid?: boolean
}) {
    return isLoading ? (
        <Spinner message="Searching..." />
    ) : results && results.length ? (
        <div className={simpleGrid ? styles.simple : styles.results}>
            {results.map((asset: any) => (
                <AssetTeaser key={asset.id} asset={asset} />
            ))}
        </div>
    ) : (
        <div className={styles.empty}>
            <p>No Data Sets Found.</p>
            <Link to="/publish">+ Publish A Data Set</Link>
        </div>
    )
}
