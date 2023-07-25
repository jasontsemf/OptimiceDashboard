require('dotenv').config();
// module.exports = {
//   PORT: process.env.PORT || 3000,
//   MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
// }

module.exports = {
  PORT: 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
}