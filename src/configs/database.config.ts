import {connect, ConnectOptions} from  'mongoose';

export const dbConnect=()=>{
    connect(process.env.Mongo_URI!,{
        useNewUrlParser:true,
        useUnifiedTopology:true


    } as ConnectOptions).then(()=>
        console.log("Connect Successfully!"),
        (error)=>console.log(error)
    )
}