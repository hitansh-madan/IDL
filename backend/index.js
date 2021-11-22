import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import TemplatesDAO from "./dao/templates.dao.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.port || 8000;

MongoClient.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
})
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .then(async (client) => {
    await TemplatesDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
