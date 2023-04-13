import {
  PrismicRichText,
  useSinglePrismicDocument,
  useAllPrismicDocumentsByType,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { format } from "https://cdn.skypack.dev/date-fns";

const Home = () => {
  const [home] = useSinglePrismicDocument("home");
  const [posts] = useAllPrismicDocumentsByType("posts");
  return (
    <>
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
                <a href="">
                  <PrismicRichText field={item.data.post_title} />
                </a>
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
    </>
  );
};

export default Home;
