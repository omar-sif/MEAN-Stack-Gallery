const express = require('express');
const connectDB = require('./mongoose');
const app = express() ;
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const uploadRoutes = require('./routers/upload');
const downloadRoutes = require('./routers/download');
let port = 8000; 

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes );
app.use('/user' , userRoutes);
app.use('/gallery', uploadRoutes);
app.use('/gallery' , downloadRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD , OPTIONS , PATCH , PUT, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept, X-Requested-With');
  
    next();
  });



app.listen(port, ()=> { console.log(`Listening on port ${port} ...`)});
