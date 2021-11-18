const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const Tour=require('./../../models/tourModel');

dotenv.config({path:'./config.env'})


// const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected');
})

const tours= JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))
importData=async ()=>{
    try
    {
        await Tour.create(tours);
        console.log('data imported');
    }
    catch(err){
        console.log(err);
    }
    
}
deleteData=async ()=>{
    try
    {
        await Tour.deleteMany();
    }
    catch(err){
        console.log(err);
    }
    
}
// deleteData();
importData();



// if(process.argv[2]==='--import')
// {
//     importData();
// }
// if(process.argv[2]==='--delete')
// {
//     deleteData();
// }
