# Quiz Us Storybook

This is the development environment for building components for the [`@quiz-us/kit` component library](https://www.npmjs.com/package/@quiz-us/kit).

## Setting Up

`npm run setup`
`npm start`

## Managing Dependencies

This project has 2 `package.json` files: 1 for the outer storybook-level
directory, and 1 for the inner directory that we publish as an npm component
library.

For the outer level, `dependencies` should simulate the environment that
consumers of our component library would have. For example, we would expect
consumers of our component library to already have `react` and `react-dom` in
their project, so we simulate that by adding it as a depenency in the outer
storybook directory.

Anything that's listed under `dependencies` in the outer level should be listed
under `peerDependencies` in the inner directory's `package.json`.

If your component depends on a library that is not likely to exist already in
the end user's project, then mark it as a dependency on the inner level.

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

## Testing

Components are tested using
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

The general principle that React Testing Library follows is to mimic the
behavior of the end user as much as possible. This means that when testing for
the existence of an element, try to select that element using properties that an
end user would be able to see, such as a label text, rather than meta-properties
like html tags or properties.

### Important React Testing Library resources

- [Intro to React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [React Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Choosing the correct queries](https://testing-library.com/docs/guide-which-query)
