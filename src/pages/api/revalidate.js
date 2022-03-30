export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECURITY_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.unstable_revalidate(req.query.path);

    if (req.query.path !== '/projects' && req.query.path.includes('projects')) {
      await res.unstable_revalidate('/projects');
    }

    if (req.query.path.includes('projects')) {
      await res.unstable_revalidate('/');
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
