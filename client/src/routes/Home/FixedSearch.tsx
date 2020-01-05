import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import Form from '../../components/atoms/Form/Form'

import styles from './FixedSearch.module.scss'

interface FixedSearchProps {
    searchAssets: any
}

interface FixedSearchState {
    search: string,
    showSearch: boolean
}

export default class FixedSearch extends PureComponent<FixedSearchProps, FixedSearchState> {
    public state = {
        search: '',
        showSearch: false
    }

    private searchToggle = () => {
        this.setState({showSearch: !this.state.showSearch})
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value
        })
    }

    public render() {
        const { search, showSearch } = this.state

        return (
            <Form
                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    this.props.searchAssets(search, e)
                }
                minimal
            >
                <div className={!showSearch ? styles.searchWrapper : styles.searchWrapper + ' ' + styles.active}>
                    <div className={styles.inputHolder}>
                        <input className={styles.searchInput} name="search" type="search" value={search} placeholder="e.g. mobility, land cover classification, market analysis, etc" onChange={this.inputChange}/>
                        <a className={styles.searchIcon} onClick={() => this.searchToggle()}><span></span></a>
                    </div>
                    <span className={styles.close} onClick={() => this.searchToggle()}></span>
                </div>
            </Form>
        )
    }
}
