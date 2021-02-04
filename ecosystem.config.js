module.exports = {
  apps : [{
    name: "Servidor Transapp",
    script: "server/server.js",
    watch: false,
    env: {
      "NODE_ENV": "production",
      "PORT": 5000,
      "TOKEN": "Token-Auth",
      "HOST": "localhost",
      "USER_DB": "admin",
      "PASSWORD": "Myviaje$2020",
      "DB": "myviaje",
      "PORT_DB": 3606
    }
  }],

};
