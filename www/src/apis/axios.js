import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:9527'
    : 'https://river.qas612820704.now.sh',

});

/**
 *
 * @param {string} jwtToken
 */
export function updateAccessToken(accessToken = '') {
  if (!accessToken) return false;

  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    Authorization: `Bearer ${accessToken}`,
  };

  return true;
}

export default axios;
