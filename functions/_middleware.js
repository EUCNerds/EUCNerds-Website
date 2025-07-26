class ElementHandler {
  constructor(ogtag) {
    this.ogtag = ogtag;
  }
  element(element) {
    element.append(this.ogtag, { html: true });
  }
}

export async function onRequest(context) {
  const { request, next } = context;
  const res = await next();
  const { searchParams, pathname } = new URL(request.url);

  if (!(pathname === '/index.html' || pathname === '/')) {
    return res;
  }

  // ✅ Use your real metadata here
  const metatitle = "EUC Nerds – End User Computing Experts";
  const metadescription = "Expert End User Computing solutions for Citrix, Azure, Microsoft 365, and more.";
  const ogImage = "https://eucnerds.com/img/eucnerds_glasses6.png";
  const pageUrl = "https://eucnerds.com/";

  const ogtag = `
    <meta property="og:title" content="${metatitle}" />
    <meta property="og:description" content="${metadescription}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:width" content="1200" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metatitle}" />
    <meta name="twitter:description" content="${metadescription}" />
    <meta name="description" content="${metadescription}" />
  `;

  return new HTMLRewriter().on('head', new ElementHandler(ogtag)).transform(res);
}
