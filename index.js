const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
// const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(bodyParser.json());

app.use(route);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
