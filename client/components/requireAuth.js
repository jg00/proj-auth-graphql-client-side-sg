import React from "react";
import { graphql } from "react-apollo";
import currentUserQuery from "../queries/CurrentUser";
import { hashHistory } from "react-router";

export default (WrappedComponent) => {
  class RequireAuth extends React.Component {
    // We want to check if user is authenticated every single time the state is updated.
    // Inspect new set of props
    // nextProps argument that the component is to be rendered with
    componentWillUpdate(nextProps) {
      console.log(
        "requireAuth-componentWillUpdate",
        nextProps.data.loading,
        nextProps.data.user
      );

      // Redirect if user is not athenticated
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push("/login");
      }
    }

    /* Ref only - componentDidMount() only runs when component after component is rendered to the screen.
      componentDidMount() {
        console.log(
          "requireAuth-componentDidMount",
          this.props.data.loading,
          this.props.data.user
        );

        // Redirect if user is not athenticated
        if (!this.props.data.loading && !this.props.data.user) {
          hashHistory.push("/login");
        }
      }
    */

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
