# commoners-starter-kit
A cross-platform app for testing the [`commoners`](commoners.dev) build tool.

When new changes are pushed to `main`, this application will automatically be built and distributed in the following formats:
- [x] Web — Progressive Web App (PWA)
- [ ] Mac
- [ ] Windows
- [ ] Linux
- [ ] iOS
- [ ] Android

Related services will be hosted using [Railway](https://railway.app/), where following considerations apply:
1. When registering each service, set the `build` command to something useless (e.g. `node -v`) and run only a single service at a time (e.g. `npm run dev --service node`)
2. For each service, generate a domain in the Networking tab. Paste this into your `commoners.config.ts` file

## Running the Solidarity Demo
To run the Python server, you'll need to create a `conda` environment from the `environment.yml` file.

After this, activate the `solidarity` environment and run `npm run dev` to start the development server on your default browser or `npm start` to begin developing for desktop!

## Current Issues
### Railway Service Deployment
1. Cannot connect to Railway Node server because our WebSocket connection is not secure (http is fine...)
2. Selecting [build providers](https://docs.railway.app/deploy/builds#build-providers) is an premium feature, and our app auto-registers as Node only. So the Railway Python server fails with `Error: spawn python ENOENT` because there is no Python installed.
