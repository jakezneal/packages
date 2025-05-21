# @jakezneal/vue-test-utils

A set of utility functions for improved DX when writing tests using Vue.js and Vue Test Utils.

## Works with the following tech stack

-   Vite
-   `@vue/test-utils`
-   Vitest

## Installation

```bash
pnpm add --save-dev @jakezneal/vue-test-utils
```

## Setup

Create a tests setup file (typically located at `tests/setup.ts`), and add it to your Vitest config file:

```ts
test: {
    setupFiles: './tests/setup.ts',
}
```

Within the file you should define any mocks, stubs, globals etc that your tests suite may rely on. This module provides helpers to facilitate this setup:

```ts
import {
    mockComponents,
    mockDirectives,
    setMocks,
    setPlugins,
    setStubs,
    setWrapperPlugins,
} from '@jakezneal/vue-test-utils';
import test from '@jakezneal/vue-test-utils/directives/test';
import addTestIdHelpers from '@jakezneal/vue-test-utils/wrapper-plugins/test-id-helpers';
import { createBootstrap } from 'bootstrap-vue-next';
import { BModal } from 'bootstrap-vue-next';

// Register any VueWrapper plugins
setWrapperPlugins({
    addTestIdHelpers,
});

// Register any global plugins
setPlugins([createBootstrap()]);

// Register any global components
mockComponents({
    BModal,
});

// Mock any directives that might be used in your app
mockDirectives({
    test,
});

// Stub any global components
setStubs({
    BPopover: true,
});

// Mock any global Vue properties
setMocks({
    $t: (msg) => msg,
});
```

## Testing

Sometimes it's helpful to add a specific attribute to your tests to quickly and easily access your testable elements, without having to rely on specific markup. For this we recommend adding a `data-testid="someKey"` to your testable elements, and using the `findByTestId` helper. For example:

```html
<ul>
    <li>Some item I don't want to test</li>
    <li data-testid="testableListItem">My testable element</li>
    <li>Another item I don't want to test</li>
</ul>
```

In the above example, previously you might do something like:

```ts
const listItem = wrapper.findAll('li').at(1);
```

The problem here, is that if you later add another list item above this, your test will fail, even though the content of the `li` may be correct.

With the introduction of the `data-testid` attribute we're able to avoid this problem by strictly fetching the item we need, e.g.:

```ts
const listItem = wrapper.find('[data-testid="testableListItem"]');
```

For further reading on this method, check out this [article by Kent C. Dodds](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change).

### `findByTestId`

Typing out the full accessor path is a lot of duplication, so we can instead use the provided helper:

```ts
const listItem = wrapper.findByTestId('testableListItem');
```

### `findAllByTestId`

You can also use the `findAllByTestId` method for finding multiple testIds.

```ts
const listItems = wrapper.findAllByTestId('testableListItem');
```

### `findComponentByTestId`

If you have multiple of the same component and can't easily target it with a `findComponent`, you can use the `findComponentByTestId` method to do this. For example:

```html
<MyComponent data-testid="componentOne" />
<MyComponent data-testid="componentTwo" />
<MyComponent data-testid="componentThree" />

<MyComponent v-for="i in 5" data-testid="repeatedComponents" />
```

You can differentiate and access the individual components using the following:

```ts
// Returns a single wrapper
const componentOne = wrapper.findComponentByTestId(
    {
        name: 'my-component',
    },
    'componentOne',
);
// Returns a single wrapper
const componentTwo = wrapper.findComponentByTestId(
    {
        name: 'my-component',
    },
    'componentTwo',
);
```

Doing the above allows you to easily assert that the element you want to access is the correct component as well as ensuring it's the correct individual component you need to access.

### `findAllComponentsByTestId`

If you need to access multiple components, for example to access a repeated collection, you can use this helper to return a wrapper array.

```html
<MyComponent data-testid="componentOne" />
<MyComponent data-testid="componentTwo" />
<MyComponent data-testid="componentThree" />

<MyComponent v-for="i in 5" data-testid="repeatedComponents" />
```

You can differentiate and access the collection of components using the following:

```ts
// Returns a wrapper array
const repeatedComponents = wrapper.findAllComponentsByTestId(
    {
        name: 'my-component',
    },
    'repeatedComponents',
);
```

### `v-test` directive

To make this easier in your template, you can also make use of the provided `v-test` directive. Simply pull in and register the directive like so:

```ts
// setup.js
import test from '@jakezneal/vue-test-utils/directives/test';

mockDirectives({
    test,
});
```

Once pulled in, this directive can be used like so:

```html
<ul>
    <li>Some item I don't want to test</li>
    <li v-test:testableListItem>My testable element</li>
    <li>Another item I don't want to test</li>
</ul>
```

These data attributes will only render in test environments, i.e. in Vitest and Storybook.
