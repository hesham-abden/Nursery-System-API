const express = require("express");
const morgan = require("morgan");
const teacherRouter = require("./Routes/teacherRouter");
const childRouter = require("./Routes/childRouter");
const classRouter = require("./Routes/classRouter");
const loginRouter = require("./Routes/loginRoute");
const authenticationMW = require("./Middlewares/authenticationMW");
const { default: mongoose } = require("mongoose");
const server = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/nurserySystem")
  .then(() => {
    console.log("DB connected...");
    server.listen(process.env.PORT || 8080, () => {
      console.log("server is listenining ,.....");
    });
  })
  .catch((error) => {
    console.log("DB problem " + error);
  });
//===================== Logging (Morgan) ===============//
server.use(morgan("method(:method) URL(:url) Status(:status)"));

//========================json parser==================//
server.use(express.json());
// server.use(express.urlencoded())  //deprecated ?

//===================== Routing ===================//
server.use(loginRouter);
server.use(authenticationMW);
server.use(teacherRouter, childRouter, classRouter);

//===================== NOT-FOUND MIDDLEWARE ===================//

server.use((request, response) => {
  response.status(404).json({ message: "Page Not Found" });
});

//===================== Exception Handling MIDDLEWARE ===================//

server.use((error, request, response, next) => {
  response.status(500).json(`Exception Error : ${error}`);
});
