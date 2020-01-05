import React, { PureComponent, FormEvent } from 'react'
import { History } from 'history'
import { Market } from '../../context'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'

import meta from '../../data/meta.json'
import Content from '../../components/atoms/Content'
import DataAssetsLatest from '../../components/organisms/DataAssetsLatest'
import UnionTeaser from '../../components/organisms/UnionTeaser'
import BountiesList from '../../components/organisms/BountiesList'
import Button from '../../components/atoms/Button'
import Search from './Search'
import FixedSearch from './FixedSearch'
import SearchResults from './SearchResults'
import { Link } from 'react-router-dom'
// import withTracker from '../../hoc/withTracker'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string,
    fixedSearch: boolean,
    showSearch: boolean
}

class Home extends PureComponent<HomeProps, HomeState> {
    public static contextType = Market

    public state = {
        fixedSearch: false,
        showSearch: false
    }

    public searchAssets = (
        search: string,
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${search}`)
    }

    handleScroll = () => {
        if(window.pageYOffset > 230) {
            this.setState({fixedSearch: true})
        } else {
            this.setState({fixedSearch: false})
        }
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    public render() {
        const { fixedSearch } = this.state;
        const results:any = [];
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <video autoPlay muted loop className={styles.bgVideo}>
                    <source src="/home-bg.mp4" type="video/mp4" />
                </video>
                <Content>
                    <div className={styles.mainButtons}>
                        {fixedSearch && (
                            <FixedSearch searchAssets={this.searchAssets} />
                        )}
                        <div>
                            <Search searchAssets={this.searchAssets} />
                        </div>
                        <SearchResults results={results}/>
                        <Link to="/topics">Browse by topic →</Link>
                    </div>
                </Content>

                <Content wide>
                    <h2 className={styles.title}>Research Groups</h2>
                    <div className={styles.groups}>
                        <UnionTeaser channel="ai-for-good" />
                    </div>
                    <DataAssetsLatest />
                </Content>

                <Content wide>
                    <h2 className={styles.title}>Bounties</h2>
                    <BountiesList />
                </Content>
            </Route>
        )
    }
}

// export default withTracker(Home)
export default Home
