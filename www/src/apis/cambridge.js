import axios from './axios';

export async function fetchAutoCompleteJson(word) {
  const response = await axios.get(`/cambridge/english-chinese-traditional/auto-complete/${word}`);

  return response.data;
}

export async function fetchWord(word) {
  const response = await axios.get(`/cambridge/english-chinese-traditional/${word}`);

  return response.data;
}

