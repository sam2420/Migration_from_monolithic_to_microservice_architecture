const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.json({ message: 'Hello from customer' })
}
);

app.listen(8001, () => {
    console.log('Customer service is running on port 8001');
}

);