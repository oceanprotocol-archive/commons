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
                    // react-pagination starts counting at 0, we start at 1
                    initialPage={currentPage - 1}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={6}
                    onPageChange={data => handlePageClick(data)}
                    disableInitialCallback
                    previousLabel={'←'}
                    nextLabel={'→'}
                    breakLabel={'...'}
                    containerClassName={styles.pagination}
                    pageLinkClassName={styles.number}
                    activeLinkClassName={styles.current}
                    previousLinkClassName={styles.prev}
                    nextLinkClassName={styles.next}
                    disabledClassName={styles.prevNextDisabled}
                    breakLinkClassName={styles.break}
                />
            )
        )
    }
}
