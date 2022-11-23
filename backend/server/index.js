import { DBconnection } from "./db.js";
import { PORT } from "./config.js";
import app from "./app.js";

DBconnection();

app.listen(PORT);
console.log("server listening on port", PORT)