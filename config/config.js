//require("dotenv").config();

module.exports = {
  config: {
    mongo: {
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      connectionString: 'mongodb://127.0.0.1/chatroom'   //process.env.mongoConnectionString,
    },
    port: 3000
  }
};
