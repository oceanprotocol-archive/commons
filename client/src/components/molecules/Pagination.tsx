import React, { PureComponent } from 'react'
import Button from '../atoms/Button'
import styles from './Pagination.module.scss'

const PageNumber = ({
    i,
    current,
    setPage
}: {
    i: number
    current: boolean
    setPage(page: number): void
}) => (
    <Button
        link
        className={current ? styles.current : styles.number}
        onClick={() => setPage(i + 1)}
    >
        {`${i + 1}`}
    </Button>
)

const PrevNext = ({
    currentPage,
    prevPage,
    setPage
}: {
    currentPage: number
    prevPage?: number
    setPage(page: number): void
}) => (
    <Button
        link
        onClick={
            prevPage ? () => setPage(prevPage) : () => setPage(currentPage + 1)
        }
    >
        {prevPage ? '←' : '→'}
    </Button>
)

export default class Pagination extends PureComponent<{
    currentPage: number
    totalPages: number
    prevPage?: number
    setPage(page: number): void
}> {
    public render() {
        const { currentPage, totalPages, prevPage, setPage } = this.props
        const isFirst = currentPage === 0
        const isLast = currentPage === totalPages

        return totalPages > 1 ? (
            <div className={styles.pagination}>
                <div>
                    {!isFirst && (
                        <PrevNext
                            prevPage={prevPage}
                            currentPage={currentPage}
                            setPage={setPage}
                        />
                    )}
                </div>
                <div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PageNumber
                            key={`pagination-number${i + 1}`}
                            i={i}
                            current={currentPage === i + 1}
                            setPage={setPage}
                        />
                    ))}
                </div>
                <div>
                    {!isLast && (
                        <PrevNext currentPage={currentPage} setPage={setPage} />
                    )}
                </div>
            </div>
        ) : null
    }
}
