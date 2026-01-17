import React from "react";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:1337/graphql",
  }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
 
);
