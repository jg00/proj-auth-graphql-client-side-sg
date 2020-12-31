import React from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import mutation from "../mutations/Login";
import query from "../queries/CurrentUser";
import { hashHistory } from "react-router";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  // Note this lifecycle is deprecated.  However this project is on React v15.4.2
  componentWillUpdate(nextProps) {
    // this.props // old/current set of props
    // nextProps  // the next set of props that will be in place when the component rerenders.

    // console.log("componentWillUpdate-this.props", this.props);
    // console.log("componentWillUpdate-nextProps", nextProps);

    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query }], // Refresh this.props.data.user that will cause a rerender of other components dependent on property user (ex: Header component)
      })
      .catch((res) => {
        // debugger;
        const errors = res.graphQLErrors.map((err) => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="container">
        <h3>Log In</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));

/*
  Note: 
  1 Re this.props.mutate() remember that all mutations are all Promises.  So they return a Promise that gets resoved after the mutation has been completed.

  2 res.graphQLErrors prop is populated automatically by Apollo

*/
