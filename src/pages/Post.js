import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { format } from "https://cdn.skypack.dev/date-fns";
import pigLatin from "https://cdn.skypack.dev/piglatin";
import Layout from "components/Layout";

const Post = () => {
  const { uid } = useParams();
  const [prismicDoc, prismicDocState] = usePrismicDocumentByUID("posts", uid);

  useEffect(() => {
    if (prismicDocState === "failed") {
      console.warn("Post document was not found in Prismic repository");
    }
  }, [prismicDocState]);

  // Use HTML Serializer to render h2s as pig Latin and codespan as code
  // TODO: Do I need to move this to a React component? See curriculum
  const htmlSerializer = {
    heading2: ({ children }) => `${pigLatin(children)}`,
    label: ({ children, node }) =>
      `<code class="${node.data.label}">${children}</code>`,
  };

  if (prismicDoc) {
    const coverImage = prismicH.asImageWidthSrcSet(
      prismicDoc.data.cover_image,
      {
        duotone: ["black", "white"],
      }
    );
    const authors = prismicDoc.data.author_profile;
    return (
      <Layout>
        <article>
          <header id="post-meta">
            <h2>
              {prismicH.asHTML(
                prismicDoc.data.post_title,
                null,
                htmlSerializer
              )}
            </h2>
            <time
              dateTime={prismicH
                .asDate(prismicDoc.first_publication_date)
                .toISOString()}
            >
              {format(
                prismicH.asDate(prismicDoc.first_publication_date),
                "dd/MM/yyyy"
              )}
            </time>
            <img
              src={coverImage.src}
              srcSet={coverImage.srcset}
              alt={coverImage.alt}
            />
          </header>
          <main id="post-content">
            <PrismicRichText field={prismicDoc.data.post_content} />
            <pre>
              {prismicH.asHTML(
                prismicDoc.data.code_snippet,
                null,
                htmlSerializer
              )}
            </pre>
          </main>
          <footer id="box-container">
            <h3>Authors</h3>
            {authors?.map((author) => {
              const authorImage = prismicH.asImageWidthSrcSet(
                author.author_image
              );
              return (
                <div key={JSON.stringify(author.data)}>
                  <div className="box-content">
                    <PrismicRichText field={author.author_name} />
                    <PrismicRichText field={author.author_bio} />
                    <a href={author.author_website_link.url}>
                      {prismicH.asText(author.author_website_text)}
                    </a>
                  </div>
                  <div className="box-image">
                    <img
                      src={authorImage.src}
                      srcSet={authorImage.srcset}
                      alt={authorImage.alt}
                    />
                  </div>
                </div>
              );
            })}
          </footer>
        </article>
      </Layout>
    );
  }
};

export default Post;
