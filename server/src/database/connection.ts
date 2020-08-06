// Para fazer banco de dados com sintaxe de javascript
import knex from 'knex';

// Ferramente que ajuda a criar arquivos e mexer com caminhos => remove a necessidade do uso de barras
import path from 'path';

// Criação do banco de dados com knex
const db = knex({
   client: 'sqlite3', // definição do tipo de banco de dados
   connection: {
      filename: path.resolve(__dirname, 'database.sqlite') // criação do arquivo de banco de dados
   },
   useNullAsDefault: true, // Para que o sqlite entenda o que tem que botar em campos que não forem completados
});

export default db;
