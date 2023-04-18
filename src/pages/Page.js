import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Layout from "components/Layout";

const Page = () => {
  const { uid } = useParams();
  const [prismicDoc, prismicDocState] = usePrismicDocumentByUID("pages", uid);

  useEffect(() => {
    if (prismicDocState === "failed") {
      console.warn("Page document was not found in Prismic repository");
    }
  }, [prismicDocState]);
  if (prismicDoc) {
    const coverImage = prismicH.asImageWidthSrcSet(prismicDoc.data.cover_image);
    return (
      <Layout>
        <article>
          <header id="post-meta">
            <h2>{prismicH.asHTML(prismicDoc.data.post_title)}</h2>
            <img
              src={coverImage.src}
              srcSet={coverImage.srcset}
              alt={coverImage.alt}
            />
          </header>
          <main id="page-content">
            <PrismicRichText field={prismicDoc.data.page_text} />
          </main>
        </article>
      </Layout>
    );
  }
};

export default Page;
