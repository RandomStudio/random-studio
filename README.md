## random.studio

Gatsby + Netlify CMS based website for Random Studio.

## Important information

As of November 2020:

- Staging and Production sites are hosted on sustainable host, Leafcloud
- CMS user authentication is provided by Netlify Identity. Nginx is setup to reroute requests to `/netlify-identity` and `/netlify-git` to `random-studio.netlify.app/.netlify/identity` and `random-studio.netlify.app/.netlify/git` respectively
- Deploys are handled by Github Workflows (see `.github/worfklows` for config) and automatically triggered on `staging` and `master` branches
- SSH keys are stored in Github secrets
