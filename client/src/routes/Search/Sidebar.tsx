import React from 'react'
import Input from '../../components/atoms/Form/Input'
import Filters from './Filters'
import styles from './Sidebar.module.scss'

export default function Sidebar({
    searchInput,
    inputChange,
    category,
    license,
    setCategory,
    setLicense
}: {
    search: string
    searchInput: string
    inputChange: any
    category: string
    license: string
    setCategory(category: string): void
    setLicense(license: string): void
}) {
    return (
        <aside className={styles.sidebar}>
            <Input
                type="search"
                name="searchInput"
                label="Search"
                placeholder="e.g. shapes of plants"
                value={searchInput}
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
                setCategory={setCategory}
                setLicense={setLicense}
            />
        </aside>
    )
}
