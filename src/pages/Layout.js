import "./App.css";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const siteTitle = "The Sock Kingdom";

  return (
    <div className="App">
      <header id="page-header">
        <a href="/">
          <h1>{siteTitle}</h1>
        </a>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Posts</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer id="page-footer">© 2023 The Sock Kingdom</footer>
    </div>
  );
};

export default Layout;
