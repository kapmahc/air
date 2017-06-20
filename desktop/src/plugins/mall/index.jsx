import React from 'react'
import { Route } from 'react-router'

import SelfAddressesIndex from './self/addresses/Index'
import SelfAddressesEdit from './self/addresses/Edit'

export default [
  <Route key="mall.self.addresses.new" path="/mall/self/addresses/new" component={SelfAddressesEdit}/>,
  <Route key="mall.self.addresses.edit" path="/mall/self/addresses/edit/:id" component={SelfAddressesEdit}/>,
  <Route key="mall.self.addresses.index" path="/mall/self/addresses" component={SelfAddressesIndex}/>,
]
