import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

function create(initialState) {
  const isBrowser = typeof window !== "undefined"; //false nếu window là undefined
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
      credentials: "same-origin",
      fetch: !isBrowser && fetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // window is undefined
  if (typeof window === "undefined") {
    return create(initialState);
  }

  // chưa tồn tại apolloClient tạo mới nó
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
}
