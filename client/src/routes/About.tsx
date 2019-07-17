import React, { useContext } from 'react'
import { Market, User } from '../context'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import VersionNumbers from '../components/molecules/VersionNumbers'
import Web3message from '../components/organisms/Web3message'
import stylesVersionNumbers from '../components/molecules/VersionNumbers/index.module.scss'
import withTracker from '../hoc/withTracker'

const About = () => {
    const market = useContext(Market)
    const user = useContext(User)

    return (
        <Route
            title="About"
            description={`A marketplace to find and publish open data sets in the Ocean ${market.network} Network.`}
        >
            <Content>
                <p>
                    Commons is built on top of the Ocean{' '}
                    <a href="https://docs.oceanprotocol.com/concepts/pacific-network/">
                        {market.network} network
                    </a>{' '}
                    and is targeted at enthusiastic data scientists with some
                    crypto experience. It can be used with any Web3-capable
                    browser, like Firefox with MetaMask installed.
                </p>

                <ul>
                    <li>
                        <a href="https://blog.oceanprotocol.com/the-commons-marketplace-c57a44288314">
                            Read the blog post →
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/oceanprotocol/commons">
                            Check out oceanprotocol/commons on GitHub →
                        </a>
                    </li>
                </ul>
            </Content>

            <Content>
                <h2 className={stylesVersionNumbers.versionsTitle}>
                    Your Web3 Account Status
                </h2>
                <Web3message extended />
                <VersionNumbers account={user.account} />
            </Content>
        </Route>
    )
}

export default withTracker(About)
