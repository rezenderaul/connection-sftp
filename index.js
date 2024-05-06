require("dotenv").config();

const Client = require("ssh2").Client;

const connSettings = {
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT, // Normal is 22 port
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASS,
};

var remotePathToList = process.env.SFTP_DIR;

var conn = new Client();
conn
  .on("ready", function () {
    conn.sftp(function (err, sftp) {
      if (err) throw err;

      sftp.readdir(remotePathToList, function (err, list) {
        if (err) throw err;
        // List the directory in the console
        console.dir(list);
        // Do not forget to close the connection, otherwise you'll get troubles
        conn.end();
      });
    });
  })
  .connect(connSettings);
