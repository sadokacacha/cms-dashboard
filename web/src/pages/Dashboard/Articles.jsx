import { Helmet } from "react-helmet-async";
import { useSeoMeta } from "../../hooks/useSeoMeta";

export default function Articles() {
  const meta = useSeoMeta();

  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.ogTitle} />
          <meta property="og:image" content={meta.ogImage} />
          {meta.scripts &&
            JSON.parse(meta.scripts).map((s, i) => (
              <script
                key={i}
                dangerouslySetInnerHTML={{ __html: s.script }}
              />
            ))}
        </Helmet>
      )}

      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Articles Page</h1>
        <p>This is a placeholder page for testing dynamic SEO.</p>
      </div>
    </>
  );
}
