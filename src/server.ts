import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import swaggerDocs from './swagger.json';

import { routes } from "./routes";
import { botDetran } from "./bot";

const app = express();

app.use(cors());
app.use(json({
  limit: '50mb'
}));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

const PORT = 5005;
const HOST = '0.0.0.0';

app.listen(process.env.PORT_API || PORT, () => {
  console.log("SERVER ON");
  setTimeout(() => {
    botDetran();
    console.log("BOT ON");
  }, 5000);
});


