const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');
const appError=require('./utils/appError');
const errorController=require('./controllers/errorController');






app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
app.all('*',(req,res,next)=>{
    
    next(new appError(`Can't find ${req.originalUrl} on this server`,404));
})

//global error middleware
app.use(errorController)


module.exports=app;