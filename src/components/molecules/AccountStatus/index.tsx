import React, { PureComponent } from 'react'
import TetherComponent from 'react-tether'
import AccountPopover from './Popover'
import AccountIndicator from './Indicator'

interface AccountStatusProps {
    className?: string
}

interface AccountStatusState {
    isPopoverOpen: boolean
}

export default class AccountStatus extends PureComponent<
    AccountStatusProps,
    AccountStatusState
> {
    public state = {
        isPopoverOpen: false
    }

    public togglePopover() {
        this.setState(prevState => ({
            isPopoverOpen: !prevState.isPopoverOpen
        }))
    }

    public render() {
        return (
            <TetherComponent
                // http://tether.io/#options
                attachment="top center"
                constraints={[
                    {
                        to: 'scrollParent',
                        attachment: 'together',
                        pin: true
                    }
                ]}
                // https://github.com/danreeves/react-tether#props
                renderTarget={ref => (
                    <AccountIndicator
                        togglePopover={() => this.togglePopover()}
                        className={this.props.className}
                        forwardedRef={ref}
                    />
                )}
                renderElement={ref =>
                    this.state.isPopoverOpen && (
                        <AccountPopover forwardedRef={ref} />
                    )
                }
            />
        )
    }
}
