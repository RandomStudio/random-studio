## Random.studio

[![The Random Studio logo](https://github.com/RandomStudio/random-studio/blob/master/public/og-image.png?raw=true)](https://random.studio/)

Static website for Random Studio, built using Next.js.

## Important information

- Hosted on Netlify, content managed via DatoCMS
- Deploys are handled by Netlify and automatically triggered on pushing to any branch, as well as when content is updated in DatoCMS

## Archived special editions

- [Studio Photogrammetry wonder (Dec 2019)](https://archive-studio-wonder--sage-melomakarona-00e1a3.netlify.app/)
- [Studio Photogrammetry with Daan wonder (unreleased)](https://archive-studio-with-daan-wonder--sage-melomakarona-00e1a3.netlify.app/)
- [Geoff/Jurgis Sculpture wonder (Feb 2020)](https://archive-sculpture--sage-melomakarona-00e1a3.netlify.app/)
- [Paris announcement (May 2021)](https://archive-paris-announcement--sage-melomakarona-00e1a3.netlify.app/)

## Deploy workflow
- Push to a branch on Github to start a deploy to Netlify
- You can view the status of a deploy, or name of a subdomain, via the Netlify control panel

## Backup workflow
- Runs automatically at 3am Monday, Wednesday and Friday
- Uses DatoCMS API to download a copy of all records (projects, pages, etc) from CMS as JSON
- Uses DatoCMS API to download a copy of all assets (images, videos, etc) from CMS to local folders
- Files are saved under `/cms/backups` and committed to master branch

## Technical notes
- For development, environment variables `NEXT_DATOCMS_API_TOKEN` and `BUNNY_TOKEN` should be set. Normally devs would create a `.env` file (ignored by git) to store these variables. The values for these tokens can be found in Lastpass as a note called "random.studio .env file".
-  `package-lock.json` has been disabled. This avoids an issue with Next.js's new SWC Rust based compiler package. If lock file exists, npm will always try to install the same build that is supported by the CPU of the user who first create the lock file. When collaborating across ARM, x86 etc it is easier to disable the lock file and let npm pull the right version on each run.
-  Based on above point, all package versions should be explicitly locked.
-  We do not host video files on DatoCMS, rather we host videos on BunnyCDN and add the video's ID to Dato. When fetching the data at build time, we look for these fields and fetch additional info about the video – eg: aspect ratio, thumbnail, etc – from Bunny to be able to better lay out the video content blocks.
-  Each time we get video information from the Bunny CDN, we cache it for future runs in `.videoCache.json`. This should be kept out of version control to avoid conflicts.
