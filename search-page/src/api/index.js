const API_ENDPOINT = 'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev/api';

const API = {};

const request = async url => {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json().message;
    throw new Error(error);
  }
};

/**
 * @description Keyword로 검색된 고양이 사진 목록
 * @param {String} keyword
 * @returns {Array}
 */
API.getCats = keyword => {
  return request(`${API_ENDPOINT}/cats/search?q=${keyword}`);
};
/**
 * @description ID로 검색된 고양이 사진
 * @param {String} id
 * @returns {Object}
 */
API.getCat = id => {
  return request(`${API_ENDPOINT}/cats/${id}`);
};
/**
 * @description 랜덤한 50개의 고양이 사진 목록
 * @returns {Array}
 */
API.randomCats = _ => {
  return request(`${API_ENDPOINT}/cats/random50`);
};

export { API };
