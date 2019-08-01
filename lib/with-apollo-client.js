import React from "react";
import initApollo from "./init-apollo";
import Head from "next/head";
import { getDataFromTree } from "react-apollo";

export default App => {
  return class Apollo extends React.Component {
    static displayName = "withApllo(App)";

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo();
      if (typeof window === "undefined") {
        try {
          await getDataFromTree(
            <App>
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            </App>
          );
        } catch (error) {
          console.error("Error while running `getDataFromTree`", error);
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();
      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
