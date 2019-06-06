# Quiz Us Storybook

This is the development environment for building components for the [`@quiz-us/kit` component library](https://www.npmjs.com/package/@quiz-us/kit).

## Checklist

When building a new component, try your best to have the following:

- [ ] document the component in a README
- [ ] a story that features the functionality of the component
- [ ] unit tests; if necessary/possible, write integration tests with the component

## Material-UI

The component library is built on top of [Material-UI](https://material-ui.com/).

There are three main libraries in use here:

- `@material-ui/core`
- [`@material-ui/icons`](https://www.npmjs.com/package/@material-ui/icons)
- `@material-ui/styles`

### `@material-ui/core`

When importing core components, assume that the end user does not have tree shaking capabilities set up. Use [path imports to avoid pulling in unused modules](https://material-ui.com/guides/minimizing-bundle-size/):

Instead of:

```js
import { Button, TextField } from '@material-ui/core';
```

Use:

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

### `@material-ui/icons`

When you need a material icon, navigate to [https://material.io/tools/icons/](https://material.io/tools/icons/).

1. Find the icon you need by using the top left search bar. Using the tool, the
   `check_circle` icon is found.
2. Import the React icon component from the `icons` package like so:

```js
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
```

### `@material-ui/styles

When styling, use Material-UI's [Hook API](https://material-ui.com/styles/basics/#hook-api).

This will allow for much cleaner component structures and avoid our base
components being wrapped by multiple layers of HOCs, which will make testing
much easier.

## Build and Publish

As a rule, only publish after your component has been reviewed and merged into `master`.

To publish the new components, run `npm run publish-components`. This command does the following:

1. lints the component library and fixes any fixable linting issues.
2. builds the library using `rollup`.
3. bumps `@quiz-us/kit`s version
4. publishes the package to npm

## Storybook Deployment

Any time a branch gets merged into master, CircleCI will deploy the new version
of Quiz Us' storybook. The storybook can be accessed [here](http://storybook-quizus.s3-website-us-west-2.amazonaws.com).
