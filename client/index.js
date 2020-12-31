import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider, createNetworkInterface } from "react-apollo";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import requireAuth from "./components/requireAuth";

const client = new ApolloClient({
  // networkInterface,
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));

/* Ref only.  No longer needed for Apollo v2.
  // Set up customized network interface (instead of the default which does not send along cookies) to send along cookies with the query itself.
  const networkInterface = createNetworkInterface({
    uri: "/graphql",
    opts: {
      credentials: "same-origin", // Instruct that it is safe to send along cookies with the outgoing requests.
    },
  });
*/
