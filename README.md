## Random.studio

[![The Random Studio logo](https://github.com/RandomStudio/random-studio/blob/master/public/og-image.jpg?raw=true)](https://random.studio/)

Static website for Random Studio, built using Next.js.

## Important information

- Staging and Production sites are hosted on sustainable host, Leafcloud
- Deploys are handled by Github Workflows (see `.github/worfklows` for config) and automatically triggered on `staging` and `master` branches
- SSH keys are stored in Github secrets

## Deploy workflow
- Push to either `staging` or `master` branches on Github to start deploy to either staging or production site
- Workflow configures environment, builds site via `npm run build`, statically exports to `.out` folder, and uploads to the server

## Backup workflow
- Runs automatically at 3am Monday, Wednesday and Friday
- Uses DatoCMS API to download a copy of all records (projects, pages, etc) from CMS as JSON
- Uses DatoCMS API to download a copy of all assets (images, videos, etc) from CMS to local folders
- Files are saved under `/cms/backups` and committed to master branch

## Technical notes
- For development, environment variables `NEXT_DATOCMS_API_TOKEN` and `VIMEO_TOKEN` should be set. Normally devs would create a `.env` file (ignored by git) to store these variables. The values for these tokens can be found in Lastpass as a note called "random.studio .env file".
-  `package-lock.json` has been disabled. This avoids an issue with Next.js's new SWC Rust based compiler package. If lock file exists, npm will always try to install the same build that is supported by the CPU of the user who first create the lock file. When collaborating across ARM, x86 etc it is easier to disable the lock file and let npm pull the right version on each run.
-  Based on above point, all package versions should be explicitly locked.
-  We do not host video files on DatoCMS, rather we host videos on Vimeo and use the CMS's built in external videos block to link to these. Dato will pull a good amount of basic info for each video, but we run an additional script at build time to add further info to each video. This allows us to generate blurred thumbnails etc.
-  Each time we get information from the Vimeo API, we cache it for future runs in `.videoCache.json`. This should be kept out of version control to avoid conflicts.
