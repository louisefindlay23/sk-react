import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "pages/Home";
import Page from "pages/Page";
import Post from "pages/Post";
import Preview from "pages/Preview";

import { PrismicProvider, PrismicToolbar } from "@prismicio/react";
import { client, repositoryName } from "./prismic";

export default function App() {
  return (
    <PrismicProvider client={client}>
      <BrowserRouter>
        {/* Using React Router for Home, Pages, Posts, and Preview routes */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:uid" element={<Page />} />
          <Route path="/post" element={<Navigate to="/" />} />
          <Route path="/post/:uid" element={<Post />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>
      <PrismicToolbar repositoryName={repositoryName} />
    </PrismicProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
