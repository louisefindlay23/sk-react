import {
  PrismicText,
  PrismicRichText,
  usePrismicDocumentByUID,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { format } from "https://cdn.skypack.dev/date-fns";
import pigLatin from "https://cdn.skypack.dev/piglatin";
import Layout from "components/Layout";
import HTMLSerializer from "components/HTMLSerializer";

const Post = ({ children }) => {
  const { uid } = useParams();
  const [prismicDoc, prismicDocState] = usePrismicDocumentByUID("posts", uid);

  useEffect(() => {
    if (prismicDocState === "failed") {
      console.warn("Post document was not found in Prismic repository");
    }
  }, [prismicDocState]);

  // Use HTML Serializer to render h2s as pig Latin and codespan as code
  const htmlSerializer = {
    heading2: ({ children }) => <h2>`${pigLatin(children)}`</h2>,
    label: ({ node, children }) => (
      <HTMLSerializer label={node.data.label}>${children}</HTMLSerializer>
    ),
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
            <PrismicText
              field={prismicDoc.data.post_title}
              components={htmlSerializer}
            ></PrismicText>
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
            <PrismicRichText
              field={prismicDoc.data.code_snippet}
              components={htmlSerializer}
            />
          </main>
          <footer id="box-container">
            <h3>Authors</h3>
            {authors?.map((author) => {
              const authorImage = prismicH.asImageWidthSrcSet(
                author.author_image
              );
              return (
                <div key={JSON.stringify(author.author_name)}>
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
