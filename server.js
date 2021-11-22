const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
process.on('uncaughtException',err=>{
    console.log(err.name,err.message);
    console.log('Unhandled Rejection Shutting down')
        process.exit(1);
})

const app=require('./app');
// const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected');
})




const PORT = process.env.PORT| 3000;

const server=app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
})

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    console.log('Unhandled Rejection Shutting down')
    server.close(()=>{
        process.exit(1);
    })
})
