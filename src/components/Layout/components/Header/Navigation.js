import { PrismicLink, useSinglePrismicDocument } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

export default function Navigation() {
  const [navigationMenu] = useSinglePrismicDocument("navigation");
  if (navigationMenu) {
    return (
      <nav>
        <ul>
          {/* Iterate over link Group field to create links to Prismic Documents
          using PrismicLink */}
          {navigationMenu.data.menu?.map((link) => {
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
