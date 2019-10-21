exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  const helmet = Helmet.renderStatic()

  setHtmlAttributes(helmet.htmlAttributes.toComponent())
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.meta.toComponent(),
    helmet.link.toComponent(),
  ])
}
