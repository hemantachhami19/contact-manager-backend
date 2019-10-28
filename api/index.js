import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import contactRoutes from './server/routes/ContactRoute';

config.config();

const app = express();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/contacts', contactRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this Contact Manager API.',
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
