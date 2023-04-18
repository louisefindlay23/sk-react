import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

export default function Layout({ children }) {
  const siteTitle = "The Sock Kingdom";

  return (
    <div className="App">
      <Outlet />
      <Header siteTitle={siteTitle} />
      <main>{children}</main>
      <Footer siteTitle={siteTitle} />
    </div>
  );
}