import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDb from "./db/db1.js";
import app from "./app.js";

connectDb()
  .then(() => {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`DB connection error: ${err.message}`);
    process.exit(1);
  });
