import Navigation from "./Navigation";
import "./Header.css";

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
