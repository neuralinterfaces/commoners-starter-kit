# commoners-starter-kit
A cross-platform app for testing the [`commoners`](commoners.dev) build tool.

When new changes are pushed to `main`, this application will automatically be built and distributed in the following formats:
- [x] Web — Progressive Web App (PWA)
- [x] Mac
- [x] Windows
- [x] Linux
- [ ] iOS
- [ ] Android

If you'd like to host the services remotely (e.g. on [Railway](https://railway.app/)), please consider the following:
1. You will want to build services using the `commoners build --service tsNode` syntax
2. The build artifacts can be launched using `commoners launch --service tsNode`
3. Paste any generated URLs into the `commoners.config.ts` file in the services `publish.remote` field.