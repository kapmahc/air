export const SITE_REFRESH = 'site.refresh'
export const USERS_SIGN_IN = "users.sign-in"
export const USERS_SIGN_OUT = "users.sign-out"
export const SIDEBAR_TOGGLE = "sitebar.toggle"

export const signIn = (token) => {
  return {
    type: USERS_SIGN_IN,
    token
  }
}

export const signOut = () => {
  return {
    type: USERS_SIGN_OUT
  }
}

export const refresh = (info) => {
  return {
    type: SITE_REFRESH,
    info
  }
}

export const toggleSideBar = () => {
  return {
    type: SIDEBAR_TOGGLE
  }
}
