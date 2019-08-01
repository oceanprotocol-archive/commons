import React, { PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import styles from './Filters.module.scss'
import data from '../../data/form-publish.json'

const { steps } = data

const labelCategories =
    steps &&
    steps[1].fields &&
    steps[1].fields.categories &&
    steps[1].fields.categories.label

const optionsCategories =
    steps &&
    steps[1].fields &&
    steps[1].fields.categories &&
    steps[1].fields.categories.options

const labelLicense =
    steps &&
    steps[2].fields &&
    steps[2].fields.license &&
    steps[2].fields.license.label

const optionsLicense =
    steps &&
    steps[2].fields &&
    steps[2].fields.license &&
    steps[2].fields.license.options

const filters = [
    { label: labelCategories, items: optionsCategories },
    { label: labelLicense, items: optionsLicense }
]

export default class Sidebar extends PureComponent<{
    category: string
    license: string
    setCategory(category: string): void
    setLicense(license: string): void
}> {
    public render() {
        const { category, license, setCategory, setLicense } = this.props

        return filters.map(filter => (
            <div
                key={filter.items && filter.items[0]}
                className={styles.filter}
            >
                <h3 className={styles.filterTitle}>{filter.label}</h3>
                <ul className={styles.filter}>
                    {filter.items &&
                        filter.items
                            .sort((a: string, b: string) => a.localeCompare(b)) // sort alphabetically
                            .map((option: string) => {
                                const isActive =
                                    category === option || license === option

                                return (
                                    <li
                                        key={option}
                                        className={
                                            isActive ? styles.active : undefined
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
                                                    alert(
                                                        'TODO: Implement clearing'
                                                    )
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
        ))
    }
}
