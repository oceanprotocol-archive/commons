import React, { PureComponent } from 'react'
import cx from 'classnames'
// import Button from '../atoms/Button'
import { User } from '../../context/User'
import styles from './AccountStatus.module.scss'

interface AccountStatusProps {
    className?: string
}

interface AccountStatusState {
    popoverOpen: boolean
}

export default class AccountStatus extends PureComponent<
    AccountStatusProps,
    AccountStatusState
> {
    public state = {
        popoverOpen: false
    }

    private togglePopover() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    public render() {
        return (
            <div
                className={cx(styles.status, this.props.className)}
                onMouseEnter={() => this.togglePopover()}
                onMouseLeave={() => this.togglePopover()}
                onTouchStart={() => this.togglePopover()}
            >
                <User.Consumer>
                    {states =>
                        !states.isWeb3 ? (
                            <span className={styles.statusIndicator} />
                        ) : !states.isLogged ? (
                            <span
                                className={styles.statusIndicatorCloseEnough}
                            />
                        ) : states.isLogged ? (
                            <span className={styles.statusIndicatorActive} />
                        ) : null
                    }
                </User.Consumer>

                {this.state.popoverOpen && <AccountPopover />}
            </div>
        )
    }
}

const AccountPopover = () => (
    <div className={styles.popover}>
        <div className={styles.accountName}>
            <User.Consumer>
                {states =>
                    states.account ? (
                        <span className={styles.address} title={states.account}>
                            {states.account}
                        </span>
                    ) : (
                        'No account selected'
                    )
                }
            </User.Consumer>
        </div>
        <div className={styles.popoverInfoline}>
            Network: &nbsp;<strong>{''}</strong>
        </div>
        {/* <div className={styles.popoverInfoline}>
            <User.Consumer>
                {states => (
                    <Button link onClick={states.requestFromFaucet}>
                        Make it rain
                    </Button>
                )}
            </User.Consumer>
        </div> */}
    </div>
)
