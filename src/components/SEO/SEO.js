import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const defaultMeta = [
  {
    name: 'author',
    content: 'Random Studio',
  },
  {
    name: 'keywords',
    content:
      'Random Studio, Digital Agency, Digital Production, Daan Lucas, Technology Workshop, Creative Studio',
  },
  { name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
  { name: 'theme-color', content: '#ffffff' },
  { name: 'msapplication-TileColor', content: '#ffffff' },
];

const SEO = ({
  title,
  description,
  image,
  pathName,
  socialDescription,
  socialTitle,
}) => {
  const defaultTitle = 'Random Studio';

  const defaultDescription =
    'Random Studio is an experience design studio. We are an international team of visual artists, strategists and engineers who blur the boundaries between art, design and technology.';

  const twitterHandle = '@random.studio';
  const siteUrl = 'https://random.studio';

  const formatTitle = string => `${defaultTitle} - ${string}`;

  const pageTitle = title ? formatTitle(title) : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageUrl = `${siteUrl}${pathName}`;

  const ogTitle = socialTitle ? formatTitle(socialTitle) : pageTitle;
  const ogDescription = socialDescription || pageDescription;
  const ogImage = `${siteUrl}${image}`;

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      meta={[
        ...defaultMeta,
        { name: 'description', content: pageDescription },

        // OG
        { property: 'og:title', content: ogTitle },
        { property: 'og:site_name', content: 'Random Studio' },
        { property: 'og:description', content: ogDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:url', content: pageUrl },
        { property: 'og:image', content: ogImage },

        // Explicit image sizing for twitter
        { property: 'og:image:width', content: 800 },
        { property: 'og:image:height', content: 800 },

        // Twitter
        { name: 'twitter:title', content: ogTitle },
        { name: 'twitter:description', content: ogDescription },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: twitterHandle },
      ]}
      title={pageTitle}
    >
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
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathName: PropTypes.string.isRequired,
  socialDescription: PropTypes.string,
  socialTitle: PropTypes.string,
};

SEO.defaultProps = {
  title: '',
  description: '',
  image: '/og-image.jpg',
  socialDescription: null,
  socialTitle: null,
};

export default SEO;
