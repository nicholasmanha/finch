# Bluesky Web Component Library
Bluesky Web React component library. 

Documentation and Storybook example webpage in progress.

#  Installation
Install within your existing React project:
```
npm install bluesky-web
```

Example usage:
```js
//App.tsx
import { Tiled } from 'bluesky-web';
import 'bluesky-web/style.css';

function App() {
  return (
    <Tiled tiledBaseUrl='http://customUrl:port/api/v1'>
  )
}
```

You will only need to import 'bluesky-web/style.css' once, so long as it is imported inside a component that is high enough in the React tree to include all bluesky-web components.

Hint: To quickly check the props that a component takes on typescript apps, press 'ctrl+space' when clicked inside a component.

# Installation - Developer
Developer setup clones the repo and allows the local use of Storybook, an interactive UI component viewer.

New to React? Make sure you have [npm installed first](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Clone repo and install

```
git clone https://github.com/SeijDeLeon/react-vite-boilerplate.git
```

```
cd react-vite-boilerplate
npm install
```

## Run the dev servers
To start up the react app:
```
npm run dev
```

To start up the storybook server:
```
npm run storybook
```





