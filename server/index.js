const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const multer = require('multer');



const db = require('./models');

// Routers
const userRouter = require('./routes/Users');
app.use('/auth', userRouter);



db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log('Server is running on port 3002...');
  });
});
