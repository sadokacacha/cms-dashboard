import { Helmet } from "react-helmet-async";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function SeoHead() {
  const meta = useSeoMeta();
  if (!meta) return null;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:image" content={meta.ogImage} />
      {meta.scripts &&
        JSON.parse(meta.scripts).map((s, i) => (
          <script key={i} dangerouslySetInnerHTML={{ __html: s.script }} />
        ))}
    </Helmet>
  );
}
