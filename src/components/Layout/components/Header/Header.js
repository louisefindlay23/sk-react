import "./Header.css";
import Navigation from "./Navigation";

export default function Header({ siteTitle }) {
  return (
    <header id="page-header">
      <a href="/">
        <h1>{siteTitle}</h1>
      </a>
      <Navigation />
    </header>
  );
}
