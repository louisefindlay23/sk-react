import { PrismicLink, PrismicText } from "@prismicio/react";
import { Link } from "react-router-dom";

export default function Navigation({ navigation }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/post">Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
