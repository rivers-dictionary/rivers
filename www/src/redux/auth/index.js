import { parse } from 'cookie';
import { authentication } from '../../lib/auth0';
import jwt from 'jsonwebtoken';

export const SET_AUTH = 'SET_AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';
const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_AUTH:
      return {};
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

      setTimeout(() => {
        dispatch({ type: CLEAR_AUTH });
      }, auth.expiresIn * 1000);
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

    const nowSecond = Math.floor(Date.now() / 1000);
    const expiresIn = jwt.decode(accessToken).exp - nowSecond;

    if (expiresIn < 0) return;

    dispatch(setAuth({
      accessToken,
      expiresIn,
    }));

    authentication.userInfo(accessToken, (err, userInfo) => {
      if (err) return console.error(err);

      dispatch(setAuth({
        user: userInfo
      }));
    });

  }
}

export default auth;
