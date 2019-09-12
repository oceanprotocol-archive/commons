import React from 'react'
import shortid from 'shortid'
import Button from '../../components/atoms/Button'
import styles from './Filters.module.scss'
import data from '../../data/form-publish.json'

const { steps } = data

const labelCategories =
    steps &&
    steps[1].fields &&
    steps[1].fields.categories &&
    steps[1].fields.categories.label

const labelLicense =
    steps &&
    steps[2].fields &&
    steps[2].fields.license &&
    steps[2].fields.license.label

function getFilterMetadata(results: any[]) {
    const filterCategories: string[] = []
    const filterLicenses: string[] = []

    results.map(asset => {
        const { metadata } = asset.findServiceByType('Metadata')
        const { categories, license } = metadata.base
        categories && filterCategories.push(categories[0])
        license && filterLicenses.push(license)
        return null
    })

    return { filterCategories, filterLicenses }
}

export default function Filters({
    category,
    license,
    results,
    setCategory,
    setLicense
}: {
    category: string
    license: string
    results: any[]
    setCategory(category: string): void
    setLicense(license: string): void
}) {
    const { filterCategories, filterLicenses } = getFilterMetadata(results)

    const filters = [
        { label: labelCategories, items: filterCategories },
        { label: labelLicense, items: filterLicenses }
    ]

    return (
        <>
            {filters.map(filter => (
                <div key={shortid.generate()} className={styles.filter}>
                    <h3 className={styles.filterTitle}>{filter.label}</h3>
                    <ul className={styles.filter}>
                        {filter.items &&
                            filter.items
                                .sort((a: string, b: string) =>
                                    a.localeCompare(b)
                                ) // sort alphabetically
                                .map((option: string) => {
                                    const isActive =
                                        category === option ||
                                        license === option

                                    return (
                                        <li
                                            key={shortid.generate()}
                                            className={
                                                isActive
                                                    ? styles.active
                                                    : undefined
                                            }
                                        >
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
                                                        filter.label ===
                                                        'Category'
                                                            ? setCategory('')
                                                            : setLicense('')
                                                    }
                                                >
                                                    &times;
                                                </Button>
                                            )}
                                        </li>
                                    )
                                })}
                    </ul>
                </div>
            ))}
        </>
    )
}
