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

## Current Issues
1. Cannot connect to Railway Node server because our WebSocket connection is not secure + port forwarding doesn't work with this protocol
2. The Railway Python server is non-responsive...
