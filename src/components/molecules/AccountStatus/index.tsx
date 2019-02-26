import React, { PureComponent } from 'react'
import Popover from 'react-popover'
import AccountPopover from './Popover'
import AccountIndicator from './Indicator'

interface AccountStatusProps {
    className?: string
}

interface AccountStatusState {
    popoverIsOpen: boolean
}

export default class AccountStatus extends PureComponent<
    AccountStatusProps,
    AccountStatusState
> {
    public state = {
        popoverIsOpen: false
    }

    public togglePopover(toState?: boolean) {
        const popoverIsOpen =
            typeof toState === 'boolean' ? toState : !this.state.popoverIsOpen
        this.setState({ popoverIsOpen })
    }

    public render() {
        const popoverProps = {
            isOpen: this.state.popoverIsOpen,
            enterExitTransitionDurationMs: 300,
            tipSize: 0.01,
            onOuterAction: () => this.togglePopover(false),
            body: <AccountPopover />
        }

        return (
            <Popover {...popoverProps}>
                <AccountIndicator
                    showPopover={() => this.togglePopover(true)}
                    className={this.props.className}
                />
            </Popover>
        )
    }
}
