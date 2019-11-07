import React, { PureComponent } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

interface PaginationProps {
    totalPages: number
    currentPage: number
    handlePageClick(data: { selected: number }): Promise<any>
}

interface PaginationState {
    smallViewport: boolean
}

export default class Pagination extends PureComponent<
    PaginationProps,
    PaginationState
> {
    public state = { smallViewport: true }

    private mq = window.matchMedia && window.matchMedia('(min-width: 600px)')

    public componentDidMount() {
        if (window && window.matchMedia) {
            this.mq.addListener(this.viewportChange)
            this.viewportChange(this.mq)
        }
    }

    public componentWillUnmount() {
        if (window && window.matchMedia) {
            this.mq.removeListener(this.viewportChange)
        }
    }

    private viewportChange = (mq: { matches: boolean }) => {
        if (mq.matches) {
            this.setState({ smallViewport: false })
        } else {
            this.setState({ smallViewport: true })
        }
    }

    public render() {
        const { totalPages, currentPage, handlePageClick } = this.props
        const { smallViewport } = this.state

        return (
            totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    // react-pagination starts counting at 0, we start at 1
                    initialPage={currentPage - 1}
                    // adapt based on media query match
                    marginPagesDisplayed={smallViewport ? 0 : 1}
                    pageRangeDisplayed={smallViewport ? 3 : 6}
                    onPageChange={data => handlePageClick(data)}
                    disableInitialCallback
                    previousLabel="←"
                    nextLabel="→"
                    breakLabel="..."
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
