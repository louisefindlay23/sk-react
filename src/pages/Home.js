import {
  PrismicRichText,
  useSinglePrismicDocument,
  useAllPrismicDocumentsByType,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { format } from "https://cdn.skypack.dev/date-fns";
import Layout from "components/Layout";

const Home = () => {
  const [home] = useSinglePrismicDocument("home");
  const [posts] = useAllPrismicDocumentsByType("posts");
  return (
    <Layout>
      <main id="page-content">
        {home && <PrismicRichText field={home.data.overview_text} />}
      </main>
      <div id="box-container">
        <h2>Posts</h2>
        {posts?.map((post) => {
          const coverImage = prismicH.asImageWidthSrcSet(post.data.cover_image);

          return (
            <article key={JSON.stringify(post.data)}>
              <div className="box-content">
                <a href={`/post/${post.uid}`}>
                  <PrismicRichText field={post.data.post_title} />
                </a>
                <time
                  dateTime={prismicH
                    .asDate(post.first_publication_date)
                    .toISOString()}
                >
                  {format(
                    prismicH.asDate(post.first_publication_date),
                    "dd/MM/yyyy"
                  )}
                </time>
                <PrismicRichText field={post.data.post_content.slice(0, 1)} />
              </div>
              <div className="box-image">
                <img
                  src={coverImage.src}
                  srcSet={coverImage.srcset}
                  alt={coverImage.alt}
                />
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
