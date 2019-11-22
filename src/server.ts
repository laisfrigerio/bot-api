import { createConnection } from "typeorm";
import "reflect-metadata";
import app from "./app";

createConnection(process.env.NODE_ENV).then(async connection => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log( `server started at http://localhost:${ port }` );
    });
}).catch((error) => {
    console.log("[DATABASE CONNECTION] - Fail to connect into database " + error);
});