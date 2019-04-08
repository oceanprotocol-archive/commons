import React, { Component } from 'react'
import Route from '../components/templates/Route'

class About extends Component {
    public render() {
        return (
            <Route
                title="About"
                description="A marketplace to find and publish open data sets in the Ocean Network."
            >
                <p>
                    Commons is built on top of the Ocean{' '}
                    <a href="https://docs.oceanprotocol.com/concepts/testnets/#the-nile-testnet">
                        Nile test network
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
            </Route>
        )
    }
}

export default About
