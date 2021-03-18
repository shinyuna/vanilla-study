const API_ENDPOINT = 'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev/api';

const API = {};

/**
 * @description Keyword로 검색된 고양이 사진 목록
 * @param {String} keyword
 * @returns {Array}
 */
API.getCats = keyword => {
  return fetch(`${API_ENDPOINT}/cats/search?q=${keyword}`)
    .then(res => res.json())
    .catch(err => console.error(err));
};
/**
 * @description ID로 검색된 고양이 사진
 * @param {String} id
 * @returns {Object}
 */
API.getCat = id => {
  return fetch(`${API_ENDPOINT}/cats/${id}`)
    .then(res => res.json())
    .catch(err => console.error(err));
};
/**
 * @description 랜덤한 50개의 고양이 사진 목록
 * @returns {Array}
 */
API.random50 = _ => {
  return fetch(`${API_ENDPOINT}/cats/random50`)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export { API };
