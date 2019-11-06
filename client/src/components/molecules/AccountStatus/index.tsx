import React, { PureComponent } from 'react'
import { Manager, Reference, Popper } from 'react-popper'
import AccountPopover from './Popover'
import AccountIndicator from './Indicator'

interface AccountStatusProps {
    className?: string
    onConnect?: Promise<void>
    onDisconnect?: Promise<void>
    onClose?: Promise<void>
    onError?: Promise<void>
}

interface AccountStatusState {
    isPopoverOpen: boolean
}

export default class AccountStatus extends PureComponent<
    AccountStatusProps,
    AccountStatusState> {
    public state = {
        isPopoverOpen: false
    }

    constructor(props: AccountStatusProps) {
        super(props);
    }

    private togglePopover() {
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
                        {({ ref, style, placement }) => (
                            <AccountPopover
                                forwardedRef={ref}
                                style={style}
                                data-placement={placement}
                            />
                        )}
                    </Popper>
                )}
            </Manager>
        )
    }
}
