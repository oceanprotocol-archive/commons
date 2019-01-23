import React, { Component, FormEvent, ChangeEvent } from 'react';

interface Props {

}

interface State {
  value?: string
}

class Publish extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {value: ''};

    this.inputChange = this.inputChange.bind(this);
    this.registerAsset = this.registerAsset.bind(this);
  }

  inputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  registerAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("submit", this.state.value)

  }

  render() {
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
    );
  }
}

export default Publish;
