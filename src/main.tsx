import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/toaster";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_GRAPHQL_API_ENDPOINT,
});

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_APP_COGNITO_USERPOOL_ID,
      userPoolClientId: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
      loginWith: {
        email: true,
      },
    },
  },
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const tokenTest = await cognitoUserPoolsTokenProvider.getTokens();

    const idToken = tokenTest?.idToken?.toString();

    return {
      headers: {
        ...headers,
        Authorization: idToken,
      },
    };
  } catch (error) {
    console.warn("No token found, continuing without auth header");
    return {
      headers: {
        ...headers,
      },
    };
  }
});

const removeTypeName = (key: unknown, value: unknown) =>
  key === "__typename" ? undefined : value;

const removeTypeNameLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.data) {
      response.data = JSON.parse(JSON.stringify(response.data), removeTypeName);
    }
    return response;
  });
});

const apolloClink = ApolloLink.from([removeTypeNameLink, authLink, httpLink]);

const client = new ApolloClient({
  link: apolloClink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
    <ToastContainer position="bottom-right" autoClose={2000} />
  </ApolloProvider>
);
