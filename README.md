[![CircleCI](https://circleci.com/gh/developer239/create-opinionated-app/tree/master.svg?style=svg)](https://circleci.com/gh/developer239/create-opinionated-app/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/ff9bf164310d6fdaa9ac/maintainability)](https://codeclimate.com/github/developer239/create-opinionated-app/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/developer239/create-opinionated-app.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](http://img.shields.io/npm/v/create-opinionated-app.svg?style=flat)](https://npmjs.org/package/create-opinionated-app "View this project on npm")

# Create Opinionated React App

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

All of us need Typescript, CSS-in-JS, code quality tools and basic configuration for unit testing. This is strongly opinionated project generator that is built on top of our favourite frameworks.

- [x] [create-react-app](https://github.com/facebook/create-react-app)
- [x] [next.js](https://github.com/zeit/next.js)
- [x] [react-native](https://github.com/facebook/react-native)

#### Core Project Dependencies

- [x] ![TS](https://github.com/developer239/create-opinionated-app/blob/master/typescript.svg) Strong [types](https://www.typescriptlang.org) 
- [x] [Webpack](https://github.com/webpack), [Babel](https://github.com/babel/babel) and other essential libraries...
- [x] 💅 [Styled Components](https://github.com/styled-components/styled-components) for every React application
- [x] Router [optional] 

#### Code Quality Tools

- [x] [Eslint](https://github.com/eslint/eslint) and [Stylelint](https://stylelint.io/) with hand-crafted config
- [x] [Prettier](https://prettier.io)
- [x] [BrowserList](https://github.com/browserslist/browserslist)
- [x] [EditorConfig](https://editorconfig.org/)
- [x] 🐶 [Husky](https://github.com/typicode/husky)
- [x] [CommitLint](https://github.com/conventional-changelog/commitlint)
- [x] [LintStaged](https://github.com/okonet/lint-staged)

#### Testing

- [x] [Jest](https://github.com/facebook/jest) for cross-platform testing
- [x] 🐐 [React Testing Library](https://github.com/testing-library/react-testing-library)

## Why?

React community does not have any standard when it comes to bootstrapping new applications. 

[Create React App](https://github.com/facebook/create-react-app) or [NextJs](https://github.com/zeit/next.js/) you say? **How many extra hours do you have to spend installing code quality tools and other libraries before you can actually start working on your project?**

This is beginner friendly and **opinionated** React app generator.
