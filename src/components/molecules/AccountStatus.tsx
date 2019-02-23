import React, { PureComponent } from 'react'
// import Blockies from 'react-blockies'
import Button from '../atoms/Button'
import { User } from '../../context/User'
import styles from './AccountStatus.module.scss'

interface AccountStatusState {
    popoverOpen: boolean
}

export default class AccountStatus extends PureComponent<
    {},
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
                className={styles.status}
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
                        <>
                            {/* <Blockies
                            size={10}
                            scale={2}
                            className={styles.avatar}
                            seed={activeAccount.getId()}
                        /> */}
                            <span
                                className={styles.address}
                                title={states.account}
                            >
                                {states.account}
                            </span>
                        </>
                    ) : (
                        'No account selected'
                    )
                }
            </User.Consumer>
        </div>
        <div className={styles.popoverInfoline}>
            Network: &nbsp;<strong>{''}</strong>
        </div>
        <div className={styles.popoverInfoline}>
            <Button link onClick={''}>
                Make it rain
            </Button>
        </div>
    </div>
)
