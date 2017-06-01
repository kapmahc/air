import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import moment from 'moment'
import {LocaleProvider} from 'antd'

import reducers from './reducers'
import plugins from './plugins'
import detectLocale from './intl'

const locale = detectLocale()
moment.locale(locale.moment)

const history = createHistory()

const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

function main() {  
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={locale.antd}>
        <ConnectedRouter history={history}>
          <div>
            {plugins.routes}
          </div>
        </ConnectedRouter>
      </LocaleProvider>
    </Provider>,
    document.getElementById('root')
  );
}

export default main
