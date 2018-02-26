const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'k3yR4hasiaKat@ny4a'

const getUserId = (token,callback) => {
  jwt.verify(token, SECRET_KEY, callback)
}

const getUserDetail = (token) => {
  jwt.verify(token, SECRET_KEY, (err,decoded)=>{
    return err? false : decoded;
  })
}

const createToken = (user_data) => {
  let token = jwt.sign(user_data, SECRET_KEY)
  return token
}

const hashPassword = (password) => {
  let hashPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  return hashPassword
}

const checkPassword = (password, hashPassword) => {
  console.log(password)
  console.log(hashPassword);
  let plainpass  = CryptoJS.AES.decrypt(hashPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);

  console.log(plainpass)
  return plainpass === password
}

module.exports = {
  getUserId,
  getUserDetail,
  hashPassword,
  checkPassword,
  createToken
}