const { HelmetProvider } = require('react-helmet-async')
const React = require('react');

exports.wrapRootElement = ({ element }) => (
  <HelmetProvider>
    {element}
  </HelmetProvider>
);
