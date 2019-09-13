import React from 'react'
import Button from '../../components/atoms/Button'
import styles from './FilterItem.module.scss'

export default function FilterItem({
    isActive,
    filter,
    setCategory,
    setLicense,
    option
}: {
    isActive: boolean
    filter: any
    option: string
    setCategory(category: string): void
    setLicense(license: string): void
}) {
    return (
        <li className={isActive ? styles.active : styles.item}>
            <Button
                link
                className={styles.option}
                onClick={() =>
                    filter.label === 'Category'
                        ? setCategory(option)
                        : setLicense(option)
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
                            ? setCategory('')
                            : setLicense('')
                    }
                >
                    &times;
                </Button>
            )}
        </li>
    )
}
