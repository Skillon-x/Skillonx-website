const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const offlineRoutes = require('./routes/offline');
const onlineRoutes = require('./routes/online');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: 'http://localhost:5173', 
  methods: 'GET,POST',
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/reactnodeapp', {
 
});


app.use('/api/users/offline', offlineRoutes);
app.use('/api/users/online', onlineRoutes);

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
