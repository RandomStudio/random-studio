import React, { useEffect } from 'react';
import NextHead from 'next/head';
import { usePathname } from 'next/navigation';
import { Image } from '../../types/types';

const DEFAULTS = {
  TITLE: 'Random Studio',
  DESCRIPTION:
    'Random Studio is an experience design studio. We are an international team of visual artists, strategists and engineers who blur the boundaries between art, design and technology.',
  IMAGE: 'https://random.studio/og-image.png',
  SITE_URL: 'https://random.studio',
  KEYWORDS:
    'Random Studio, Digital Agency, Digital Production, Daan Lucas, Technology Workshop, Creative Studio',
};

const formatTitle = (string: string) =>
  `${string
    .replaceAll('<br>', '')
    .replaceAll('<br /> ', '')
    .replaceAll('  ', ' ')} - ${DEFAULTS.TITLE}`;

type HeadProps = {
  description?: string;
  image?: Image | string;
  socialDescription?: string;
  socialTitle?: string;
  title?: string;
};

const Head = ({
  description = undefined,
  image = undefined,
  socialDescription = undefined,
  socialTitle = undefined,
  title = undefined,
}: HeadProps) => {
  const pathname = usePathname();

  const pageTitle = title ? formatTitle(title) : DEFAULTS.TITLE;

  let ogImage = DEFAULTS.IMAGE;

  if (typeof image === 'string') {
    ogImage = image;
  } else if (image?.imageData.src) {
    ogImage = image.imageData.src;
  }

  const ogTitle = socialTitle ? formatTitle(socialTitle) : pageTitle;

  const pageDescription =
    socialDescription || description || DEFAULTS.DESCRIPTION;

  // Dynamically add Snitcher script
  useEffect(() => {
    const script = document.createElement('script');
    script.defer = true;
    script.innerHTML = `
      !function(s,n,i,t,c,h){s.SnitchObject=i;s[i]||(s[i]=function(){
      (s[i].q=s[i].q||[]).push(arguments)});s[i].l=+new Date;c=n.createElement(t);
      h=n.getElementsByTagName(t)[0];c.src='https://snid.snitcher.com/8427924.js';
      h.parentNode.insertBefore(c,h)}(window,document,'snid','script');
      snid('verify', '8427924');
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <NextHead>
      <title>{pageTitle}</title>

      <meta content="Random Studio" name="author" />

      <meta content={DEFAULTS.KEYWORDS} name="keywords" />

      <meta content="/favicons/browserconfig.xml" name="msapplication-config" />

      <meta content="#ffffff" name="theme-color" />

      <meta content="#ffffff" name="msapplication-TileColor" />

      <meta content={pageDescription} name="description" />

      <meta content={ogTitle} property="og:title" />

      <meta content={DEFAULTS.TITLE} property="og:site_name" />

      <meta content={pageDescription} property="og:description" />

      <meta content="website'" property="og:type" />

      <meta content="en_US" property="og:locale" />

      <meta content={`${DEFAULTS.SITE_URL}${pathname}`} property="og:url" />

      <meta content={ogImage} property="og:image" />

      <meta content="800" property="og:image:width" />

      <meta content="800" property="og:image:height" />

      <meta content={ogTitle} name="twitter:title" />

      <meta content={pageDescription} name="twitter:description" />

      <meta content={ogImage} name="twitter:image" />

      <meta content="summary_large_image" name="twitter:card" />

      <meta content="@random.studio" name="twitter:site" />

      <link
        href="/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />

      <link href="/favicons/apple-touch-icon.png" />

      <link
        href="/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />

      <link
        href="/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />

      <link
        href="/favicons/android-chrome-192x192.png"
        rel="icon"
        sizes="192x192"
        type="image/png"
      />

      <link href="/favicons/site.webmanifest" rel="manifest" />

      <link
        color="#0000ff"
        href="/favicons/safari-pinned-tab.svg"
        rel="mask-icon"
      />

      <link href="/favicons/manifest.json" rel="manifest" />

      <link href="/favicons/favicon.ico" rel="icon" />

      <script
        data-domain="random.studio"
        defer
        src="https://plausible.io/js/plausible.tagged-events.outbound-links.js"
      />
    </NextHead>
  );
};

export default Head;
