[![Actions Status](https://github.com/code-quality-resources/eslint-config-jest/workflows/CI/badge.svg)](https://github.com/developer239/create-opinionated-app/actions?query=workflow%3A%22CI%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/ff9bf164310d6fdaa9ac/maintainability)](https://codeclimate.com/github/developer239/create-opinionated-app/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](http://img.shields.io/npm/v/create-opinionated-app.svg?style=flat)](https://npmjs.org/package/create-opinionated-app "View this project on npm")

# Create Opinionated App

![](https://imgs.xkcd.com/comics/standards.png)

## Installation

Run following command:

```bash
$ npx create-opinionated-app
```

Or you can install this library as global dependency:

```bash
$ npm install -g create-opinionated-app
$ create-opinionated-app
```

## What does it do

All app generator that was created so that bootstrapping new pet project or examples for conferences and creating new open source project for awesome GitHub community is easier.

Keep in mind that this generator is **strongly opinionated**. Javascript community is most likely the liveliest. We have amazing arsenal of libraries to use. However, I would like to standardize my toolset across all projects.
 
### React Applications
 
All of us need Typescript, CSS-in-JS, code quality tools and basic configuration for unit testing. This generator creates following applications:

- [x] [create-react-app](https://github.com/facebook/create-react-app)
- [x] [next.js](https://github.com/zeit/next.js)
- [x] [react-native](https://github.com/facebook/react-native)

##### Core Project Dependencies

- [x] ![TS](https://github.com/developer239/create-opinionated-app/blob/master/typescript.svg) Strong [types](https://www.typescriptlang.org) 
- [x] [Webpack](https://github.com/webpack), [Babel](https://github.com/babel/babel) and other essential libraries...
- [x] 💅 [Styled Components](https://github.com/styled-components/styled-components) for every React application
- [x] Routers [optional] - [react-router](https://github.com/ReactTraining/react-router) and for native [react-native-navigation](https://github.com/wix/react-native-navigation) or [react-navigation](https://github.com/react-navigation/react-navigation) 

##### Code Quality Tools

You can find config files for these hand-crafted [code quality resources here](https://github.com/code-quality-resources). ❤

- [x] [Eslint](https://github.com/eslint/eslint) and [Stylelint](https://stylelint.io/)
- [x] [Prettier](https://prettier.io)
- [x] [BrowserList](https://github.com/browserslist/browserslist)
- [x] [EditorConfig](https://editorconfig.org/)
- [x] 🐶 [Husky](https://github.com/typicode/husky)
- [x] [CommitLint](https://github.com/conventional-changelog/commitlint)
- [x] [LintStaged](https://github.com/okonet/lint-staged)

##### Testing

- [x] [Jest](https://github.com/facebook/jest) for cross-platform testing
- [x] 🐐 [React Testing Library](https://github.com/testing-library/react-testing-library)
- [x] [Cypress](https://github.com/wix/Detox) E2E tests for web applications
- [x] [Detox](https://github.com/cypress-io/cypress) E2E tests for native applications
 
### Node Applications
 
Backend projects are in a way much simpler to setup than frontend projects because libraries that are commonly used are more stable and Node environment is more predictable.

- [x] [nest.js](https://github.com/nestjs/nest)

##### Core Project Dependencies

- [x] ![TS](https://github.com/developer239/create-opinionated-app/blob/master/typescript.svg) Strong [types](https://www.typescriptlang.org)  

##### Code Quality Tools

You can find config files for these hand-crafted [code quality resources here](https://github.com/code-quality-resources). ❤

- [x] [Eslint](https://github.com/eslint/eslint) and [Stylelint](https://stylelint.io/)
- [x] [Prettier](https://prettier.io)
- [x] [EditorConfig](https://editorconfig.org/)
- [x] 🐶 [Husky](https://github.com/typicode/husky)
- [x] [CommitLint](https://github.com/conventional-changelog/commitlint)
- [x] [LintStaged](https://github.com/okonet/lint-staged)

##### Testing

- [x] [Jest](https://github.com/facebook/jest) for cross-platform testing

##### Deployment

- [x] [Heroku](https://github.com/heroku) optional Heroku configuration

## Contribution

If you are missing some features or if you have any ideas how to improve the code base feel free to create an issue. You **do not** have to create pull request. Right now the project is small so even bug reports or random thoughts can help. Thank you. 🙂
