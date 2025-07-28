import { Helmet } from "react-helmet-async";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function SeoHead() {
  const meta = useSeoMeta();
  if (!meta) return null;

  let parsedScripts = [];
  let parsedExternalScripts = [];

  try {
    if (meta.scripts) parsedScripts = JSON.parse(meta.scripts);
  } catch (err) {
    console.warn("Invalid inline scripts JSON:", err);
  }

  try {
    if (meta.externalScripts) parsedExternalScripts = JSON.parse(meta.externalScripts);
  } catch (err) {
    console.warn("Invalid external scripts JSON:", err);
  }

  return (
    <Helmet>
      {/* Basic Meta */}
      {meta.title && <title>{meta.title}</title>}
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.robots && <meta name="robots" content={meta.robots} />}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}

      {/* Open Graph Meta */}
      {meta.ogTitle && <meta property="og:title" content={meta.ogTitle} />}
      {meta.ogDescription && <meta property="og:description" content={meta.ogDescription} />}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      {meta.ogUrl && <meta property="og:url" content={meta.ogUrl} />}
      {meta.ogType && <meta property="og:type" content={meta.ogType} />}

      {/* Twitter Meta */}
      {meta.twitterTitle && <meta name="twitter:title" content={meta.twitterTitle} />}
      {meta.twitterDescription && <meta name="twitter:description" content={meta.twitterDescription} />}
      {meta.twitterImage && <meta name="twitter:image" content={meta.twitterImage} />}
      {meta.twitterCard && <meta name="twitter:card" content={meta.twitterCard} />}
      {meta.twitterSite && <meta name="twitter:site" content={meta.twitterSite} />}

      {/* Inline Scripts (e.g. GTM code snippet) */}
      {parsedScripts.map((s, i) => (
        <script key={`inline-${i}`} dangerouslySetInnerHTML={{ __html: s.script }} />
      ))}

      {/* External Scripts (e.g. GTM via src) */}
      {parsedExternalScripts.map((s, i) => (
        <script
          key={`external-${i}`}
          src={s.src}
          async={s.async ?? true}
          defer={s.defer ?? false}
        ></script>
      ))}
    </Helmet>
  );
}
