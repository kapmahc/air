import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import moment from 'moment'
import { LocaleProvider } from 'antd'
import { IntlProvider, addLocaleData } from 'react-intl'

import reducers from './reducers'
import routes from './plugins'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)


const main = (id, user) => {
  moment.locale(user.moment)
  addLocaleData(user.data)

  ReactDOM.render(
    (<Provider store={store}>
      <LocaleProvider locale={user.antd}>
        <IntlProvider locale={user.locale} messages={user.messages}>
          <ConnectedRouter history={history}>
            <Switch>
              {routes}
            </Switch>
          </ConnectedRouter>
        </IntlProvider>
      </LocaleProvider>
    </Provider>),
    document.getElementById(id)
  );
}

export default main;
