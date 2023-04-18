import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import "./Layout.css";

export default function Layout({ children }) {
  const siteTitle = "The Sock Kingdom";

  return (
    <div className="site">
      <Outlet />
      <Header siteTitle={siteTitle} />
      <main>{children}</main>
      <Footer siteTitle={siteTitle} />
    </div>
  );
}
