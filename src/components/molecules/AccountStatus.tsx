import React, { PureComponent } from 'react'
import cx from 'classnames'
// import Button from '../atoms/Button'
import { User } from '../../context/User'
import Popover from 'react-popover'
import styles from './AccountStatus.module.scss'

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

interface AccountStatusProps {
    className?: string
}

interface AccountStatusState {
    popoverIsOpen: boolean
    preferPlace?: string
    place?: string
    enterExitTransitionDurationMs?: number
}

export default class AccountStatus extends PureComponent<
    AccountStatusProps,
    AccountStatusState
> {
    public state = {
        popoverIsOpen: false
    }

    private togglePopover(toState: boolean) {
        const popoverIsOpen =
            typeof toState === 'boolean' ? toState : !this.state.popoverIsOpen
        this.setState({ popoverIsOpen })
    }

    public AccountIndicator = () => (
        <div
            className={cx(styles.status, this.props.className)}
            onMouseOver={() => this.togglePopover(true)}
            onMouseOut={() => this.togglePopover(false)}
            onTouchStart={() => this.togglePopover(true)}
        >
            <User.Consumer>
                {states =>
                    !states.isWeb3 ? (
                        <span className={styles.statusIndicator} />
                    ) : !states.isLogged ? (
                        <span className={styles.statusIndicatorCloseEnough} />
                    ) : states.isLogged ? (
                        <span className={styles.statusIndicatorActive} />
                    ) : null
                }
            </User.Consumer>
        </div>
    )

    public render() {
        const popoverProps = {
            isOpen: this.state.popoverIsOpen,
            // preferPlace: this.state.preferPlace,
            // place: this.state.place,
            enterExitTransitionDurationMs: 300,
            tipSize: 0.01,
            onOuterAction: () => this.togglePopover(false),
            body: <AccountPopover />
        }

        return (
            <Popover {...popoverProps}>
                <this.AccountIndicator />
            </Popover>
        )
    }
}
