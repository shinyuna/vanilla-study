const crypto = require('crypto');

const header = {
  typ: 'JWT',
  alg: 'HS256',
};
const payload = {
  iss: 'yunadev',
  exp: '1485270000000',
  userId: '11028373727102',
  username: 'shinyuna',
};
const secret = 'secrey_key';

const encodedePayload = payload => Buffer.from(JSON.stringify(payload)).toString('base64').replace('=', '');

const encodedHeader = encodedePayload(header);
const encodedPlayload = encodedePayload(payload);

const signature = crypto
  .createHmac('sha256', secret) // 주어진 algorithm및 을 사용 하는 객체를 만들고 반환합니다
  .update(encodedHeader + '.' + encodedPlayload)
  .digest('base64') // encoding 방식에 따른 결과 값
  .replace('=', '');

// => HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

console.log(`${encodedHeader}.${encodedPlayload}.${signature}`);
