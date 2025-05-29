# Finch
A React component library for Bluesky beamlines. 

To view components in your browser check out our [storybook library.](https://blueskyproject.io/finch)


#  Installation
Once you have your own React app setup, install finch in the root project directory with:
```
npm install @blueskyproject/finch
```

Example usage:
```js
//App.tsx
import { Tiled } from '@blueskyproject/finch';
import '@blueskyproject/finch/style.css';

function App() {
  return (
    <Tiled tiledBaseUrl='http://customUrl:port/api/v1'>
  )
}
```

You will only need to import '@blueskyproject/finch/style.css' once, so long as it is imported inside a component that is high enough in the React tree to include all finch components.

To use the `HubAppLayout` component, the entire app should be wrapped in a react-router component. For compatibility reasons when building into Dash components, react-router-dom V6 is used instead of v7.

```js
//main.tsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './app/index.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
)

```

Hint: To quickly check the props that a component takes on typescript apps, press 'ctrl+space' when clicked inside a component.

# Bluesky Requirements
Components in this library require network access to the Bluesky Queue Server, Tiled, and Ophyd-Websocket. The components are designed to work out of the box with the default ports for each service. 

Specific paths/ports can be set at runtime with environment variables, or alternatively passed in as props to components that need them. 

Documentation for env variables in progress.

https://github.com/bluesky/bluesky-queueserver

https://github.com/bluesky/tiled

https://github.com/bluesky/ophyd-websocket


# Installation - Developer
To check out the project without creating your own React app, or for development, you can pull down the repo and install with npm.

New to React? Make sure you have [npm installed first](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Clone repo and install

```
git clone https://github.com/bluesky/finch.git
```

```
cd finch
npm install
```

## Run the dev servers
To start up the react app:
```
npm run dev
```

[localhost:5173](http://localhost:5173)

To start up the storybook server:
```
npm run storybook
```
[localhost:6006](http://localhost:6006)




