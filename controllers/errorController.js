const appError=require('./../utils/appError');
const sendErrorProd=(res,err)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }
    else{
        res.status(500).send({
            status:'error',
            message:'Something went wrong'
        })
    }
   
}
const sendErrorDev=(res,err)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}
const handleCastError=(err)=>{
    const message=`Invalid ${err.pathname}:${err.value}`
    return new appError(message,400); 

}
const handleDuplicateError=(error)=>{
    const value=error.errmsg.match(/"((?:\\.|[^"\\])*)"/)[0];
    const message=`Duplicate field value: ${value}. Please use another value`;
    return new appError(message,400)

}
const handleValidationErrors=(err)=>{
    const errors=Object.values(err.errors).map(el=>el.message)
    const message=`Invalid data sent. ${errors.join('. ')}`
    return new appError(message,400)
}
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';

    if(process.env.NODE_ENV==='development')
    sendErrorDev(res,err);
    else if(process.env.NODE_ENV==='production')
    {
        let error={...err};
        if(error.name==='CastError')
        error=handleCastError(error)
        if(error.code===11000)
        error=handleDuplicateError(error);

        sendErrorProd(res,error);
    }
    
    
}