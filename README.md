# Node with TypeScript - Web Hooks with github and Discord - TS-Node-dev (favorite)

1. Install TypeScript and more dependencies

```sh
npm i -D typescript @types/node ts-node-dev rimraf
```

1. init TypeScript config file

```sh
npx tsc --init --outDir dist/ --rootDir src
```

1. scripts for dev, build and start ([more info about TS-NODE here](https://www.npmjs.com/package/ts-node-dev))

```sh
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```
