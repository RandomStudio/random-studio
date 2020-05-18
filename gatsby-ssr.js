// Docs: https://www.gatsbyjs.org/docs/ssr-apis/

const { HelmetProvider } = require('react-helmet-async');
const React = require('react');

const helmetContextMap = new Map();

exports.wrapRootElement = ({ element, pathname }) => {
  const helmetContext = {};
  helmetContextMap.set(pathname, helmetContext);

  return <HelmetProvider context={helmetContext}>{element}</HelmetProvider>;
};

exports.onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
  pathname,
}) => {
  const helmetContext = helmetContextMap.get(pathname);
  if (helmetContext) {
    setHtmlAttributes(helmetContext.helmet.htmlAttributes.toComponent());
    setBodyAttributes(helmetContext.helmet.bodyAttributes.toComponent());
    setHeadComponents([
      helmetContext.helmet.title.toComponent(),
      helmetContext.helmet.link.toComponent(),
      helmetContext.helmet.meta.toComponent(),
    ]);
  }
};
