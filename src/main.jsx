import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Body from './components/Body.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SearchItem from './components/searchItem/searchItem.jsx'
import RestaurantDetails from './components/detailsPage/restaurantDetails.jsx'
import { Provider } from "react-redux";
import { store } from '../redux/mainStore.js'
import Cart from './components/cartPage/cart.jsx'
import SearchByCategory from './components/searchByCategory/searchByCategory.jsx'
import SearchRestaurantCuisine from './components/searchFromHome/searchRestaurantCuisine.jsx'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />
      },

      {
        path: 'restaurants/:id',
        element: <RestaurantDetails />
      },
      {
        path: 'restaurantcuisine/restaurants/:id',
        element: <RestaurantDetails />
      },

      {
        path: 'searchItem/:restaurantId',
        element: <SearchItem />
      },

      {
        path: 'cart',
        element: <Cart />
      },

      {
        path: 'searchbycategory/:entityid',
        element: <SearchByCategory />
      },

      {
        path: 'restaurantcuisine',
        element: <SearchRestaurantCuisine />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
  // </React.StrictMode>,
)

