import React, { PureComponent } from 'react'
import Popover, { ArrowContainer } from 'react-tiny-popover'
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
            <Popover
                isOpen={this.state.isPopoverOpen}
                padding={10}
                position={'bottom'}
                transitionDuration={0.2}
                windowBorderPadding={15}
                content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer
                        position={position}
                        targetRect={targetRect}
                        popoverRect={popoverRect}
                        arrowColor={'#8b98a9'}
                        arrowSize={10}
                    >
                        <AccountPopover
                            togglePopover={() => this.togglePopover()}
                        />
                    </ArrowContainer>
                )}
            >
                <AccountIndicator
                    togglePopover={() => this.togglePopover()}
                    className={this.props.className}
                />
            </Popover>
        )
    }
}
