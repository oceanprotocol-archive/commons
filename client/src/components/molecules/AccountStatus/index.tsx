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

    private togglePopover() {
        this.setState(prevState => ({
            isPopoverOpen: !prevState.isPopoverOpen
        }))
    }

    public render() {
        return (
            <Manager>
                <Reference>
                    {({ ref }: { ref: any }) => (
                        <AccountIndicator
                            togglePopover={() => this.togglePopover()}
                            className={this.props.className}
                            forwardedRef={ref}
                        />
                    )}
                </Reference>
                {this.state.isPopoverOpen && (
                    <Popper placement="auto">
                        {({
                            ref,
                            style,
                            placement
                        }: {
                            ref: any
                            style: any
                            placement: any
                        }) => (
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
