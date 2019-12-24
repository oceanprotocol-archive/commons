import React, { PureComponent, FormEvent } from 'react'
import { History } from 'history'
import { Market } from '../../context'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'

import meta from '../../data/meta.json'
import Content from '../../components/atoms/Content'
import AssetsLatest from '../../components/organisms/AssetsLatest'
import ChannelTeaser from '../../components/organisms/ChannelTeaser'
import Button from '../../components/atoms/Button'
import Search from './Search'
import { Link } from 'react-router-dom'
// import withTracker from '../../hoc/withTracker'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
}

class Home extends PureComponent<HomeProps, HomeState> {
    public static contextType = Market

    public searchAssets = (
        search: string,
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${search}`)
    }

    public render() {
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <Content>
                    <div className={styles.mainButtons}>
                        <Button to="/topics">Browse by topic →</Button>
                        <Search searchAssets={this.searchAssets} />
                    </div>
                </Content>

                <Content wide>
                    <h2 className={styles.title}>Research Groups</h2>
                    <ChannelTeaser channel="ai-for-good" />
                    <AssetsLatest />
                </Content>

            </Route>
        )
    }
}

// export default withTracker(Home)
export default Home
