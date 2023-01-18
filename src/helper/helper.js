const bcrypt = require("bcrypt");

const getRandomValue = function (str = "1234567890", length = 4) {
  // const str = '1234567890'; //Random Generate Every Time From This Given Char
  // const length = 4;

  let randomValue = "";
  for (let i = 0; i < length; i++) {
    const value = Math.floor(Math.random() * str.length);
    randomValue += str.substring(value, value + 1).toUpperCase();
  }

  return randomValue;
};

const getUniqueValue = function (
  length = 16,
  options = { numericOnly: false }
) {
  let text = "";
  const possible =
    options && options.numericOnly
      ? "0123456789"
      : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const Response = (message, data = {}) => ({
  status: 200,
  message,
  data,
});

module.exports = {
  getRandomValue,
  getUniqueValue,
  checkPassword,
  genPasswordHash,
  Response,
};
