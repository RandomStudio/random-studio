## Random.studio

![The Random Studio logo](https://github.com/RandomStudio/random-studio/blob/master/public/og-image.jpg?raw=true)


Statically built website for Random Studio, built using Next.js.

## Important information

- Staging and Production sites are hosted on sustainable host, Leafcloud
- Deploys are handled by Github Workflows (see `.github/worfklows` for config) and automatically triggered on `staging` and `master` branches
- SSH keys are stored in Github secrets

## Deploy workflow
- Push to either `staging` or `master` branches on Github to start deploy to either staging or production site
- Workflow fires off three separate _simultaneous_ tasks:
  1. Configure environment and build site via `npm run build`, statically export to `.out` folder, and upload to the server
  2. Check the `public/img` folder for any images that have been added or changed. In turn, pass each changed filepath to `npm run process:image`. This generates a super low res `base64` encoded placeholder, uploads to Cloudflare, and saves both the placeholder and Cloudflare image ID to `infrastructure/imageLookup.json`
  3. Run through the content markdown files and `grep` any Vimeo URLs they contain. In turn, pass each changed URL to `npm run process:vimeo`. This generates a super low res `base64` encoded placeholder, using the thumbnail image, and saves to `infrastructure/vimeoLookup.json`
- Finally, if either steps 2 or 3 encountered changed files (and thus updated either of the lookup files), we rerun task 1 again. _Why? Because this ensures we start creating and push live a build as soon as possible, without waiting for assets to be processed. If there have been assets changed, we quickly do a second build to reflect those in live_
