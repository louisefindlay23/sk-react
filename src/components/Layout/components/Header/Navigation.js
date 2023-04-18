import { PrismicLink, useSinglePrismicDocument } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

export default function Navigation() {
  const [primaryMenu] = useSinglePrismicDocument("navigation");
  if (primaryMenu) {
    return (
      <nav>
        <ul>
          {primaryMenu.data.menu?.map((link) => {
            return (
              <li key={JSON.stringify(prismicH.asText(link.link_text))}>
                <PrismicLink field={link.link_url}>
                  {prismicH.asText(link.link_text)}
                </PrismicLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
