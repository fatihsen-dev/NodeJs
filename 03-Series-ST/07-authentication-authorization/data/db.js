const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
   dialect: "mysql",
   host: config.db.host,
   define: {
      timestamps: false,
   },
});

const connect = async () => {
   try {
      await sequelize.authenticate();
      console.log("MySql bağlantısı yapıldı");
   } catch (error) {
      console.log(`Bağlantı hatası: ${error}`);
   }
};
connect();
module.exports = sequelize;
