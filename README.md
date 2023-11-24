# commoners-starter-kit
A cross-platform app for testing the [`commoners`](commoners.dev) build tool.

When new changes are pushed to `main`, this application will automatically be built and distributed in the following formats:
- [x] Web — Progressive Web App (PWA)
- [x] Mac
- [x] Windows
- [x] Linux
- [ ] iOS
- [ ] Android

Related services will be hosted using [Railway](https://railway.app/), where following considerations apply:

> **Note:** As of November 2023, choosing your [build providers](https://docs.railway.app/deploy/builds#build-providers) is a [Priority Boarding](https://docs.railway.app/reference/priority-boarding) feature, where you'll have to link your Discord account to support this.

1. When registering each service, set the `build` command to something useless (e.g. `node -v`) and run only a single service at a time (e.g. `npm run dev --service node`)
2. For each service, generate a domain in the Networking tab. Paste this into your `commoners.config.ts` file

## Running the Application
To run the Python server, you'll need to create a `conda` environment from the `environment.yml` file.

After this, activate the `commoners-starter-kit` environment (`conda activate commoners-starter-kit`).

You can then run `npm run dev` to start the development server on your default browser—or `npm start` to begin developing for desktop!

To populate the UI with an interactive UI for the `python` service (documented with the OpenAPI specification), run `npm run share` (**desktop** only).

## Current Issues
### Railway Service Deployment
1. Cannot connect to Railway Node server because our WebSocket connection is not secure (http is fine...)
2. Selecting [build providers](https://docs.railway.app/deploy/builds#build-providers) is an premium feature, and our app auto-registers as Node only. So the Railway Python server fails with `Error: spawn python ENOENT` because there is no Python installed.
