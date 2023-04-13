import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostPage from "./pages/Posts";

import { PrismicProvider, PrismicToolbar } from "@prismicio/react";
import { client, repositoryName } from "./prismic";

export default function App() {
  return (
    <PrismicProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <PrismicToolbar repositoryName={repositoryName} />
    </PrismicProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
