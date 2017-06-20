import React from 'react'
import { Route } from 'react-router'

import SelfAddressesIndex from './self/addresses/Index'
import SelfAddressesEdit from './self/addresses/Edit'

import SelfStoresIndex from './self/stores/Index'
import SelfStoresEdit from './self/stores/Edit'

import SelfTagsIndex from './self/tags/Index'
import SelfTagsEdit from './self/tags/Edit'

export default [
  <Route key="mall.self.addresses.new" path="/mall/self/addresses/new" component={SelfAddressesEdit}/>,
  <Route key="mall.self.addresses.edit" path="/mall/self/addresses/edit/:id" component={SelfAddressesEdit}/>,
  <Route key="mall.self.addresses.index" path="/mall/self/addresses" component={SelfAddressesIndex}/>,

  <Route key="mall.self.stores.new" path="/mall/self/stores/new" component={SelfStoresEdit}/>,
  <Route key="mall.self.stores.edit" path="/mall/self/stores/edit/:id" component={SelfStoresEdit}/>,
  <Route key="mall.self.stores.index" path="/mall/self/stores" component={SelfStoresIndex}/>,

  <Route key="mall.self.tags.new" path="/mall/self/tags/new" component={SelfTagsEdit}/>,
  <Route key="mall.self.tags.edit" path="/mall/self/tags/edit/:id" component={SelfTagsEdit}/>,
  <Route key="mall.self.tags.index" path="/mall/self/tags" component={SelfTagsIndex}/>,
]
