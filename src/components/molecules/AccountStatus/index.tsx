import React, { PureComponent } from 'react'
import { Manager, Reference, Popper } from 'react-popper'
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
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <AccountIndicator
                            togglePopover={() => this.togglePopover()}
                            className={this.props.className}
                            forwardedRef={ref}
                        />
                    )}
                </Reference>
                {this.state.isPopoverOpen && (
                    <Popper placement="auto">
                        {({ ref, style, placement, arrowProps }) => (
                            <AccountPopover
                                forwardedRef={ref}
                                style={style}
                                arrowProps={arrowProps}
                                data-placement={placement}
                            />
                        )}
                    </Popper>
                )}
            </Manager>
        )
    }
}
