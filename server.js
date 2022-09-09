const PORT = 8080;
const express = require('express');
const app = express();
app.enable('trust proxy');

app.use('/static', express.static('static'));

app.use(express.static('dist', { extensions: ["html"] }));

app.listen(PORT, () => {
    console.log(`Local server at http://localhost:${PORT}/`);
});
