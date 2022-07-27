import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Authentication from './components/routes/authentication/authentiation.component'
import Checkout from './components/routes/checkout/checkout.component'

import Home from './components/routes/home/home.component'
import Navigation from './components/routes/navigation/navigation.component'
import Shop from './components/routes/shop/shop.componet'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation />}>          
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
