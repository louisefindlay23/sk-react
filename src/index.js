import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { PrismicProvider, PrismicToolbar } from "@prismicio/react";
import { client, repositoryName } from "./prismic";

ReactDOM.render(
  <React.StrictMode>
    <PrismicProvider client={client}>
      <App />
      <PrismicToolbar repositoryName={repositoryName} />
    </PrismicProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
