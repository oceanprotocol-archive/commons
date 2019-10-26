import React, { PureComponent } from 'react'
import { Manager, Reference, Popper } from 'react-popper'
import OPWallet from 'op-web3-wallet'
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

    public core: any;

    constructor(props: AccountStatusProps) {
        super(props);
        this.core = new OPWallet.Core({
            // network: props.network,
            // lightboxOpacity: props.lightboxOpacity,
        })
        this.core.on("connect", props.onConnect);
        this.core.on("disconnect", props.onDisconnect);
        this.core.on("close", props.onClose);
        this.core.on("error", props.onError);

    }

    private togglePopover() {
        this.core.toggleModal()
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
