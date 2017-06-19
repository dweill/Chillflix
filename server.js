/* eslint no-console: 0 */
const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('I am working');
});
