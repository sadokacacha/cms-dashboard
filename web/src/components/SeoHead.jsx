import { Helmet } from "react-helmet-async";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function SeoHead() {
  const meta = useSeoMeta();
  if (!meta) return null;

  return (
<Helmet>
  {meta.title && <title>{meta.title}</title>}
  {meta.description && (
    <meta name="description" content={meta.description} />
  )}
  {meta.ogTitle && (
    <meta property="og:title" content={meta.ogTitle} />
  )}
  {meta.ogImage && (
    <meta property="og:image" content={meta.ogImage} />
  )}
  {meta.keywords && (
  <meta name="keywords" content={meta.keywords} />
)}
{meta.robots && (
  <meta name="robots" content={meta.robots} /> // e.g., "index,follow" or "noindex"
)}
{meta.canonical && (
  <link rel="canonical" href={meta.canonical} />
)}
  {meta.scripts &&
    JSON.parse(meta.scripts).map((s, i) => (
      <script key={i} dangerouslySetInnerHTML={{ __html: s.script }} />
    ))}
</Helmet>

  );
}
