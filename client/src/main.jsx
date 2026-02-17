import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import store from './store/store.js'
import Chat from './pages/Chat.jsx'
import Quiz from './pages/Quiz.jsx'
import Wikipedia from './pages/Wikipedia.jsx'
import Youtube from './pages/Youtube.jsx'
import LoginSignup from './components/LoginSignup.jsx'
import Dashboard from './pages/Home.jsx'
import UserSettings from './pages/UserSettings.jsx'
import theme from './theme.js'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // Authenticated Layout Routes
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/chat',
            element: <Chat />
          },
          {
            path: '/youtube-recommendation',
            element: <Youtube />,
          },
          {
            path: '/wikipedia-search',
            element: <Wikipedia />
          }, {
            path: "/quiz",
            element: <Quiz />
          },
          {
            path: '/userSettings',
            element: <UserSettings />,
          }
        ]
      },
      {
        // Public / Full Screen Routes (No Sidebar/Navbar)
        path: "/authentication/:type",
        element: <LoginSignup />
      },
      // OtpVerification route removed
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
