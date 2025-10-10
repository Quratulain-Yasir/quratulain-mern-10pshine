import pino from "pino"
import fs from "fs";
import path from "path"



// ensure logs folder exist 
const logDir = "logs";
if(!fs.existsSync(logDir)) fs.mkdirSync(logDir);
//define destinations
const infoStream = pino.destination(path.join(logDir , "app.log"))

const errorStream = pino.destination(path.join(logDir , "error.log"))

//Logger configuration
const logger = pino(
    {
        level: process.env.NODE_ENV === "development" ? "debug" : "info" , 
        transport:  process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: { colorize: true, translateTime: "SYS:standard" },
          }
        : undefined ,
    } , infoStream
);
//seperate error logger
const errorLogger =  pino({} , errorStream);

export { logger , errorLogger };
