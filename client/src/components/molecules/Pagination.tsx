import React, { PureComponent } from 'react'
import Button from '../atoms/Button'
import styles from './Pagination.module.scss'

const PageNumber = ({
    i,
    current
}: {
    i: number
    current: boolean
    onClick: any
}) => (
    <Button link className={current ? styles.current : styles.number}>
        {`${i + 1}`}
    </Button>
)

const PrevNext = ({ prevPage }: { prevPage?: number; onClick: any }) => (
    <Button link>{prevPage ? '←' : '→'}</Button>
)

export default class Pagination extends PureComponent<{
    currentPage: number
    totalPages: number
    prevPage?: number
    nextPage?: number
    setPage(page: number): void
}> {
    public render() {
        const {
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            setPage
        } = this.props
        const isFirst = currentPage === 1
        const isLast = currentPage === totalPages

        return nextPage && nextPage > 1 ? (
            <div className={styles.pagination}>
                <div>
                    {!isFirst && (
                        <PrevNext
                            prevPage={prevPage}
                            onClick={setPage(currentPage - 1)}
                        />
                    )}
                </div>
                <div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PageNumber
                            key={`pagination-number${i + 1}`}
                            i={i}
                            current={currentPage === i + 1}
                            onClick={setPage(i + 1)}
                        />
                    ))}
                </div>
                <div>
                    {!isLast && <PrevNext onClick={setPage(currentPage + 1)} />}
                </div>
            </div>
        ) : null
    }
}
