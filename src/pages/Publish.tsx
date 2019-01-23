import React, { ChangeEvent, Component, FormEvent } from 'react'

interface IProps {

}

interface IState {
    value?: string
}

class Publish extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { value: '' }

        this.inputChange = this.inputChange.bind(this)
        this.registerAsset = this.registerAsset.bind(this)
    }

    public render() {
        return (
            <div>
                <h1>Publish</h1>
                <form onSubmit={this.registerAsset}>
                    <label>
                        Name:
                        <input type="text" name="value" value={this.state.value} onChange={this.inputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

    private inputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    private registerAsset(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // console.log("submit", this.state.value)
    }
}

export default Publish
