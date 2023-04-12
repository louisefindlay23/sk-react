import "./App.css";
import {
  PrismicRichText,
  useSinglePrismicDocument,
  useAllPrismicDocumentsByType,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { format } from "https://cdn.skypack.dev/date-fns";
function App() {
  const siteTitle = "The Sock Kingdom";
  const [home] = useSinglePrismicDocument("home");
  const [posts] = useAllPrismicDocumentsByType("posts");
  return (
    <div className="App">
      <header id="page-header">
        <a href="/">
          <h1>{siteTitle}</h1>
        </a>
      </header>
      <main id="page-content">
        {home && <PrismicRichText field={home.data.overview_text} />}
      </main>
      <div id="box-container">
        <h2>Posts</h2>
        {posts?.map((item) => {
          const { src, srcset } = prismicH.asImageWidthSrcSet(
            item.data.cover_image
          );

          return (
            <article key={JSON.stringify(item.data)}>
              <div className="box-content">
                <PrismicRichText field={item.data.post_title} />
                <time
                  dateTime={prismicH
                    .asDate(item.first_publication_date)
                    .toISOString()}
                >
                  {format(
                    prismicH.asDate(item.first_publication_date),
                    "dd/MM/yyyy"
                  )}
                </time>
                <PrismicRichText field={item.data.post_content.slice(0, 1)} />
              </div>
              <div className="box-image">
                <img
                  src={src}
                  srcSet={srcset}
                  alt={item.data.cover_image.alt}
                ></img>
              </div>
            </article>
          );
        })}
      </div>
      <footer id="page-footer">© 2023 The Sock Kingdom</footer>
    </div>
  );
}

export default App;
