exports.onRenderBody = ({ setHeadComponents }) => {
  const helmet = Helmet.renderStatic()

  setHeadComponents([
    helmet.title.toComponent(),
    helmet.meta.toComponent(),
    helmet.link.toComponent(),
  ])
}
