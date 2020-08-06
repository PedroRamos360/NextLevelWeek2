import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors()); // Usar o cors para fazer a ligação entre frontend e backend
app.use(express.json()); // Para o app entender objetos json
app.use(routes);

app.listen(3333);
