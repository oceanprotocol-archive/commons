import React from 'react'
import Input from '../../components/atoms/Form/Input'
import Filters from './Filters'
import styles from './Sidebar.module.scss'

export default function Sidebar({
    search,
    inputChange,
    category,
    license,
    results,
    setCategory,
    setLicense
}: {
    search: string
    inputChange: any
    category: string
    license: string
    results: any[]
    setCategory(category: string): void
    setLicense(license: string): void
}) {
    return (
        <aside className={styles.sidebar}>
            <Input
                type="search"
                name="search"
                label="Search"
                placeholder="e.g. shapes of plants"
                value={search}
                onChange={inputChange}
                // group={
                //     <Button primary onClick={search}>
                //         Search
                //     </Button>
                // }
            />

            <Filters
                category={category}
                license={license}
                results={results}
                setCategory={setCategory}
                setLicense={setLicense}
            />
        </aside>
    )
}
