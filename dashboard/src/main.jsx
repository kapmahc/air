import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { IntlProvider, addLocaleData } from 'react-intl'

import reducers from './reducers'
import plugins from './plugins'

const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

function main(user) {
  addLocaleData(user.data)
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={user.locale} messages={user.messages}>
        <ConnectedRouter history={history}>
          <div>
            {plugins.routes}
          </div>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  );
}

export default main
