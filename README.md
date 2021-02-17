# IPLD Browser

## This project is pre-release

The IPLD browser is a work in progress, and not all features are operational.  This is an adaptation of an existing project. Some of the code base is not relevant to the current effort and will be deprecated as the project progresses.

## Purpose

Enabling the creation of public and private knowledge repositories on the distributed web using the [IPLD](https://docs.ipld.io/) standard.

## Developing

### Clone and install deps

```sh
git clone https://github.com/jeffkhull/ipld-browser-ui.git && cd ipld-browser-ui
npm i
```

### Run the tests

Currently, only `test:node` generates coverage reports.  In addition, the tests currently only cover the data service portions of the code.

```sh
npm run test:node
npm run test-report
```

### Start the dev server

```sh
npm start
```

## Stack

### UI Framework and components

1. [React](https://reactjs.org/) - Framework
1. [Chakra UI](https://chakra-ui.com/) (using going forward)
2. [Grommet](https://v2.grommet.io) (phasing out)
3. [React Icons](https://react-icons.github.io/react-icons/)

### Global state management

1. [Zustand](https://github.com/pmndrs/zustand)

### Database

1. [Textile js-threaddb](https://github.com/textileio/js-threaddb)

### Testing

1. [Polendina](https://github.com/rvagg/polendina) 
    1. Uses [Mocha](https://github.com/mochajs/mocha) under the hood
2. [Chai](https://github.com/chaijs/chai) (assertions)
3. [Istanbul](https://github.com/gotwarlost/istanbul) (code coverage)

### Bundler

1. [Webpack](https://webpack.js.org/)
    1. `Note on webpack 5`: currently it doesn't work with polendina.  Staying on webpack 4 for now.  See [this issue](https://github.com/rvagg/polendina/issues/15) for details.
