import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const defaultPageTitle = 'Random Studio';

const Head = ({
  description,
  image,
  socialDescription,
  socialTitle,
  title,
}) => {
  const router = useRouter();

  const siteUrl = 'https://random.studio';

  const formatTitle = string =>
    `${string
      .replaceAll('<br>', '')
      .replaceAll('<br /> ', '')
      .replaceAll('  ', ' ')} - ${defaultPageTitle}`;

  const pageTitle = title ? formatTitle(title) : defaultPageTitle;

  const ogImage = `${siteUrl}${image}`;
  const ogTitle = socialTitle ? formatTitle(socialTitle) : pageTitle;
  const ogDescription = socialDescription || description;

  return (
    <NextHead>
      <title>{pageTitle}</title>

      <meta content="'Random Studio'" name="author" />

      <meta
        content="Random Studio, Digital Agency, Digital Production, Daan Lucas, Technology Workshop, Creative Studio"
        name="keywords"
      />

      <meta content="/favicons/browserconfig.xml" name="msapplication-config" />

      <meta content="'#ffffff'" name="theme-color" />

      <meta content="'#ffffff'" name="msapplication-TileColor" />

      <meta content="pageDescription" name="description" />

      <meta content={ogTitle} property="og:title" />

      <meta content="Random Studio" property="og:site_name" />

      <meta content={ogDescription} property="og:description" />

      <meta content="website'" property="og:type" />

      <meta content="en_US'" property="og:locale" />

      <meta content={`${siteUrl}${router.pathname}`} property="og:url" />

      <meta content={ogImage} property="og:image" />

      <meta content="800" property="og:image:width" />

      <meta content="800" property="og:image:height" />

      <meta content={ogTitle} name="twitter:title" />

      <meta content={ogDescription} name="twitter:description" />

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
        src="https://plausible.io/js/plausible.outbound-links.js"
      />
    </NextHead>
  );
};

Head.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  socialDescription: PropTypes.string,
  socialTitle: PropTypes.string,
  title: PropTypes.string,
};

Head.defaultProps = {
  description:
    'Random Studio is an experience design studio. We are an international team of visual artists, strategists and engineers who blur the boundaries between art, design and technology.',
  image: '/og-image.jpg',
  socialDescription: null,
  socialTitle: null,
  title: null,
};

export default Head;
