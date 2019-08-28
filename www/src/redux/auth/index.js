import { parse } from 'cookie';
import { authentication } from '../../lib/auth0';

export const SET_AUTH = 'SET_AUTH';

const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}


/**
 * @param {object} auth
 * @param {string} auth.accessToken
 * @param {string} auth.idToken
 * @param {string} auth.expiresIn
 * @param {object} auth.user
 */
export function setAuth(auth = {}) {
  return (dispatch) => {
    if (auth.accessToken && auth.expiresIn) {
      document.cookie = `riversAcessToken=${auth.accessToken};`
        + `max-age=${auth.expiresIn}`;
    }

    return dispatch({
      type: SET_AUTH,
      payload: auth,
    });
  }
}


export function restoreAuth() {
  return (dispatch) => {
    const cookies = parse(document.cookie);

    const accessToken = cookies.riversAcessToken;

    if (!accessToken) return;

    dispatch(setAuth({
      accessToken,
    }));

    authentication.userInfo(accessToken, (err, userInfo) => {
      if (err) return console.error(err);

      dispatch(setAuth({
        user: userInfo
      }));
    })

  }
}

export default auth;
