import React, { PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Form/Input'
import styles from './Sidebar.module.scss'
import data from '../../data/form-publish.json'

export default class Sidebar extends PureComponent<{
    search: string
    inputChange: any
    category: string
    license: string
}> {
    public render() {
        const { search, inputChange, category, license } = this.props
        const { steps }: any = data

        return (
            <aside className={styles.sidebar}>
                <Input
                    type="search"
                    name="search"
                    label="Search"
                    placeholder="e.g. shapes of plants"
                    value={search}
                    onChange={inputChange}
                    group={
                        <Button primary onClick={search}>
                            Search
                        </Button>
                    }
                />

                <div className={styles.filter}>
                    <h3 className={styles.filterTitle}>Categories</h3>
                    <ul>
                        {steps[1].fields.categories.options.map(
                            (category: string) => (
                                <li key={category}>
                                    <Button link onClick={() => null}>
                                        {category}
                                    </Button>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className={styles.filter}>
                    <h3 className={styles.filterTitle}>License</h3>
                    <ul className={styles.filter}>
                        {steps[2].fields.license.options.map(
                            (license: string) => (
                                <li key={license}>
                                    <Button link onClick={() => null}>
                                        {license}
                                    </Button>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </aside>
        )
    }
}
