const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})

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

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
})