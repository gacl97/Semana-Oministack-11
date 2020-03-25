const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Permissão para front-ends acessarem
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);