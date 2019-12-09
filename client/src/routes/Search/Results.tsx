import React from 'react'
import { Link } from 'react-router-dom'
import shortid from 'shortid'
import { DDO } from '@oceanprotocol/squid'
import AssetTeaser from '../../components/molecules/AssetTeaser'
import Pagination from '../../components/molecules/Pagination'
import styles from './Results.module.scss'

export default function Results({
    results,
    totalResults,
    totalPages,
    currentPage,
    handlePageClick
}: {
    results: DDO[]
    totalResults: number
    totalPages: number
    currentPage: number
    handlePageClick(data: { selected: number }): Promise<any>
}) {
    return results && results.length ? (
        <>
            <h2 className={styles.resultsTitle}>
                {totalResults} {totalResults === 1 ? 'result' : 'results'}
            </h2>
            <div className={styles.results}>
                {results.map((asset: any) => (
                    <AssetTeaser key={shortid.generate()} asset={asset} />
                ))}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
            />
        </>
    ) : (
        <div className={styles.empty}>
            <p>No Data Sets Found.</p>
            <Link to="/publish">+ Publish A Data Set</Link>
        </div>
    )
}
