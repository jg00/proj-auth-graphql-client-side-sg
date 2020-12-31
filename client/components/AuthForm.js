import React from "react";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
              placeholder="Email"
            />
          </div>
          <div className="input-field">
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              placeholder="Password"
              type="password"
            />
          </div>

          <div className="errors">
            {this.props.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
