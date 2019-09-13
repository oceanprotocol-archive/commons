import React from 'react'
import shortid from 'shortid'
import { DDO } from '@oceanprotocol/squid'
import data from '../../data/form-publish.json'
import FilterItem from './FilterItem'
import styles from './Sidebar.module.scss'

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
    let filterCategories: string[] = []
    let filterLicenses: string[] = []

    results.map((asset: DDO) => {
        if (!asset.findServiceByType) return null
        const { metadata } = asset.findServiceByType('Metadata')
        const { categories, license } = metadata.base
        categories && filterCategories.push(categories[0])
        license && filterLicenses.push(license)
        return null
    })

    // remove duplicates
    filterCategories = Array.from(new Set(filterCategories))
    filterLicenses = Array.from(new Set(filterLicenses))

    return { filterCategories, filterLicenses }
}

export default function Sidebar({
    category,
    license,
    results,
    filterByCategory,
    filterByLicense
}: {
    category: string
    license: string
    results: any[]
    filterByCategory(category: string): void
    filterByLicense(license: string): void
}) {
    const { filterCategories, filterLicenses } = getFilterMetadata(results)

    const filters = [
        { label: labelCategories, items: filterCategories },
        { label: labelLicense, items: filterLicenses }
    ]

    return (
        <aside className={styles.sidebar}>
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
                                        <FilterItem
                                            key={shortid.generate()}
                                            isActive={isActive}
                                            filter={filter}
                                            filterByCategory={filterByCategory}
                                            filterByLicense={filterByLicense}
                                            option={option}
                                        />
                                    )
                                })}
                    </ul>
                </div>
            ))}
        </aside>
    )
}
