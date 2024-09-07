import React, { useContext } from 'react'
import { Root } from './root/Root'
import { Access } from './access/Access'
import { Node } from './node/Node'
import { Session } from './session/Session'
import { createTheme, MantineProvider, virtualColor } from '@mantine/core'
import { CSSVariablesResolver, ModalsProvider } from '@mantine/modals'
import './App.css'
import '@mantine/core/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import classes from './App.module.css'
import { DisplayContext } from './context/DisplayContext'
import { ContextType } from './context/ContextType'

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
  //  '--mantine-spacing-xs': 0,
  },
});

const theme = createTheme({
  primaryColor: 'databag-green',
  primaryShade: { light: 6, dark: 7 },
  colors: {
    'databag-green': [
      '#eef6f2',
      '#cce5d9',
      '#aad4bf',
      '#68c4af',
      '#559e83',
      '#559e83',
      '#3c7759',
      '#2b5540',
      '#1a3326',
      '#09110d',
    ],
    'dark-surface': [
      '#000000',
      '#111111',
      '#222222',
      '#333333',
      '#444444',
      '#555555',
      '#666666',
      '#777777',
      '#888888',
      '#999999',
    ],
    'light-surface': [
      '#ffffff',
      '#eeeeee',
      '#dddddd',
      '#cccccc',
      '#bbbbbb',
      '#aaaaaa',
      '#999999',
      '#888888',
      '#777777',
      '#666666',
    ],
    'dark-text': [
      '#ffffff',
      '#eeeeee',
      '#dddddd',
      '#cccccc',
      '#bbbbbb',
      '#aaaaaa',
      '#999999',
      '#888888',
      '#777777',
      '#666666',
    ],
    'light-text': [
      '#000000',
      '#111111',
      '#222222',
      '#333333',
      '#444444',
      '#555555',
      '#666666',
      '#777777',
      '#888888',
      '#999999',
    ],
    'dark-databag-green': [
      '#99bb99',
      '#559e83',
      '#559e83',
      '#559e83',
      '#559e83',
      '#559e83',
      '#559e83',
      '#559e83',
      '#559e83',
      '#559e83',
    ],
     'light-databag-green': [
      '#888888',
      '#448844',
      '#448844',
      '#448844',
      '#448844',
      '#448844',
      '#448844',
      '#448844',
      '#448844',
      '#448844',
    ],
    'dark-tab': [
      '#111111',
      '#222222',
      '#333333',
      '#444444',
      '#444444',
      '#444444',
      '#444444',
      '#444444',
      '#444444',
      '#444444',
    ],
    'light-tab': [
      '#dddddd',
      '#cccccc',
      '#bbbbbb',
      '#aaaaaa',
      '#aaaaaa',
      '#aaaaaa',
      '#aaaaaa',
      '#aaaaaa',
      '#aaaaaa',
      '#aaaaaa',
    ],
    dbgreen: virtualColor({
      name: 'dbgreen',
      dark: 'dark-databag-green',
      light: 'light-databag-green',
    }),
    tab: virtualColor({
      name: 'tab',
      dark: 'dark-tab',
      light: 'light-tab',
    }),
    surface: virtualColor({
      name: 'surface',
      dark: 'dark-surface',
      light: 'light-surface',
    }),
    text: virtualColor({
      name: 'text',
      dark: 'dark-text',
      light: 'light-text',
    }),
  },
})

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <></> },
      { path: 'access', element: <Access /> },
      { path: 'session', element: <Session /> },
      { path: 'node', element: <Node /> },
    ],
  },
])

export function App() {
  const display = useContext(DisplayContext) as ContextType
  const scheme = display.state ? display.state.scheme : undefined

  return (
    <div className={classes.app}>
      <MantineProvider forceColorScheme={scheme} cssVariablesResolver={resolver} theme={theme}>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </div>
  )
}
