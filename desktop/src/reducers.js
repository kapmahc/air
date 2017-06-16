import jwtDecode from 'jwt-decode'

import {USERS_SIGN_IN, USERS_SIGN_OUT, SITE_REFRESH, SIDEBAR_TOGGLE} from './actions'

const currentUser = (state={}, action) => {
  switch(action.type){
    case USERS_SIGN_IN:
      try{
        return jwtDecode(action.token)
      }catch(e){
        console.error(e)
      }
      return {}
    case USERS_SIGN_OUT:
      return {}
    default:
      return state
  }
}

const siteInfo = (state={languages:[], links: []}, action) => {
  switch(action.type){
    case SITE_REFRESH:
      return Object.assign({}, action.info)
    default:
      return state;
  }
}

const sideBar = (state={show: false}, action) => {
  switch(action.type){
    case SIDEBAR_TOGGLE:
      return Object.assign({}, {show: !state.show})
    default:
      return state;
  }
}

export default {
  currentUser,
  siteInfo,
  sideBar
}
