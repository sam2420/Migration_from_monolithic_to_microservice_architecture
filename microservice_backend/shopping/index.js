const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.json({ message: 'Hello from shpping' })
}
);

app.listen(8003, () => {
    console.log('shpping service is running on port 8003');
}

);