import React, { PureComponent } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export default class Pagination extends PureComponent<{
    totalPages: number
    currentPage: number
    handlePageClick(data: { selected: number }): Promise<any>
}> {
    public render() {
        const { totalPages, currentPage, handlePageClick } = this.props

        return (
            totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    initialPage={currentPage - 1}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={6}
                    onPageChange={data => handlePageClick(data)}
                    containerClassName={styles.pagination}
                    pageLinkClassName={styles.number}
                    activeLinkClassName={styles.current}
                    previousLinkClassName={styles.prev}
                    nextLinkClassName={styles.next}
                    disabledClassName={styles.prevNextDisabled}
                    disableInitialCallback
                    previousLabel={'←'}
                    nextLabel={'→'}
                    breakLabel={'...'}
                    breakLinkClassName={styles.break}
                />
            )
        )
    }
}
