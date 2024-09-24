const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    return res.json({ message: 'Hello from products' })
}
);

app.listen(8002, () => {
    console.log('products service is running on port 8001');
}

);