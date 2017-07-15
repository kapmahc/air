import React from 'react'
import { Route } from 'react-router'

import SelfAddressesIndex from './self/addresses/Index'
import SelfAddressesEdit from './self/addresses/Edit'

import SelfStoresIndex from './self/stores/Index'
import SelfStoresEdit from './self/stores/Edit'
import SelfStoresManagers from './self/stores/Managers'

import SelfTagsIndex from './self/tags/Index'
import SelfTagsEdit from './self/tags/Edit'

import SelfProductsIndex from './self/products/Index'
import SelfProductsEdit from './self/products/Edit'

export default [
  <Route key="mall.self.addresses.new" path="/mall/self/addresses/new" component={SelfAddressesEdit}/>,
  <Route key="mall.self.addresses.edit" path="/mall/self/addresses/edit/:id" component={SelfAddressesEdit}/>,
  <Route key="mall.self.addresses.index" path="/mall/self/addresses" component={SelfAddressesIndex}/>,

  <Route key="mall.self.stores.new" path="/mall/self/stores/new" component={SelfStoresEdit}/>,
  <Route key="mall.self.stores.edit" path="/mall/self/stores/edit/:id" component={SelfStoresEdit}/>,
  <Route key="mall.self.stores.managers" path="/mall/self/stores/managers/:id" component={SelfStoresManagers}/>,
  <Route key="mall.self.stores.index" path="/mall/self/stores" component={SelfStoresIndex}/>,

  <Route key="mall.self.tags.new" path="/mall/self/tags/new" component={SelfTagsEdit}/>,
  <Route key="mall.self.tags.edit" path="/mall/self/tags/edit/:id" component={SelfTagsEdit}/>,
  <Route key="mall.self.tags.index" path="/mall/self/tags" component={SelfTagsIndex}/>,

  <Route key="mall.self.products.new" path="/mall/self/products/new" component={SelfProductsEdit}/>,
  <Route key="mall.self.products.edit" path="/mall/self/products/edit/:id" component={SelfProductsEdit}/>,
  <Route key="mall.self.products.index" path="/mall/self/products" component={SelfProductsIndex}/>,
]
