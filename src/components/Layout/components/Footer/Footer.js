import { PrismicText } from "@prismicio/react";
import "./Footer.css";

export default function Footer({ siteTitle }) {
  return (
    <footer id="page-footer">
      <p>
        © {new Date().getFullYear()} {siteTitle}
      </p>
    </footer>
  );
}
