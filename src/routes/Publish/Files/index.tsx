import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Button from '../../../components/atoms/Button'
import Help from '../../../components/atoms/Form/Help'
import ItemForm from './ItemForm'
import Item from './Item'
import styles from './index.module.scss'

interface FilesProps {
    files: any
    placeholder: string
    help: string
    // resetForm: any
}

interface FilesStates {
    isFormShown: boolean
}

export default class Files extends PureComponent<FilesProps, FilesStates> {
    public state: FilesStates = { isFormShown: false }

    public toggleForm = (e: Event) => {
        e.preventDefault()

        this.setState({ isFormShown: !this.state.isFormShown })
    }

    public addItem = (value: string) => {
        this.props.files.push(value)
        // this.props.resetForm()
        this.setState({ isFormShown: !this.state.isFormShown })
    }

    public removeItem = (index: number) => {
        this.props.files.remove(index)
    }

    public render() {
        const { isFormShown } = this.state

        return (
            <>
                <Help>{this.props.help}</Help>
                <div className={styles.newItems}>
                    {this.props.files.length > 1 && (
                        <TransitionGroup
                            component="ul"
                            className={styles.itemsList}
                        >
                            {this.props.files.map(
                                (item: string, index: number) => (
                                    <CSSTransition
                                        key={index}
                                        timeout={400}
                                        classNames="fade"
                                    >
                                        <Item
                                            item={item}
                                            removeItem={() =>
                                                this.removeItem(index)
                                            }
                                        />
                                    </CSSTransition>
                                )
                            )}
                        </TransitionGroup>
                    )}

                    <Button link onClick={this.toggleForm}>
                        {isFormShown ? '- Cancel' : '+ Add a file'}
                    </Button>

                    <CSSTransition
                        classNames="grow"
                        in={isFormShown}
                        timeout={200}
                        unmountOnExit
                        onExit={() => this.setState({ isFormShown: false })}
                    >
                        <ItemForm
                            placeholder={this.props.placeholder}
                            addItem={this.addItem}
                        />
                    </CSSTransition>
                </div>
            </>
        )
    }
}
