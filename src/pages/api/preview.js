export default function handler(req, res) {
  if (
    req.query.secret !== process.env.DATOCMS_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  res.writeHead(307, {
    Location: req.query.slug,
  });

  res.end();

  return null;
}
