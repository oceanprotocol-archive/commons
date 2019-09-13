import React from 'react'
import Button from '../../components/atoms/Button'
import styles from './FilterItem.module.scss'

export default function FilterItem({
    isActive,
    filter,
    filterByCategory,
    filterByLicense,
    option
}: {
    isActive: boolean
    filter: any
    option: string
    filterByCategory(category: string): void
    filterByLicense(license: string): void
}) {
    return (
        <li className={isActive ? styles.active : styles.item}>
            <Button
                link
                className={styles.option}
                onClick={() =>
                    filter.label === 'Category'
                        ? filterByCategory(option)
                        : filterByLicense(option)
                }
            >
                {option}{' '}
            </Button>
            {isActive && (
                <Button
                    link
                    className={styles.cancel}
                    title="Clear"
                    onClick={() =>
                        filter.label === 'Category'
                            ? filterByCategory('')
                            : filterByLicense('')
                    }
                >
                    &times;
                </Button>
            )}
        </li>
    )
}
