
# DevProjects - Link shortener web app

This is an open source project from [DevProjects](http://www.codementor.io/projects). Feedback and questions are welcome!
Find the project requirements here: [Link shortener website](https://www.codementor.io/projects/web/link-shortener-website-brqjanf6zq)

## Tech/framework used

Built with

- [Vue.js](https://vuejs.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

Deployed with

- [vercel](https://vercel.com/)

## Features

- Shorten a link
- Copy the shortened link to clipboard

## Screenshots and demo

[Live demo](https://link-shortener-hectorromerodev.vercel.app/)


## Installation

Customize configuration See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## License

[MIT](https://choosealicense.com/licenses/mit/)