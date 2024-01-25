import { Schema, model } from "mongoose";

export interface shoe{
    [x: string]: any;
    id:number;
    price:number;
    name:string;
    tags?:string[];
    imageurl:string;
}

export const shoeSchema = new Schema<shoe>({
    id:{type:Number, required:false},
    name:{type:String, required:true},
    price:{type:Number, required:true},
    tags:{type:[String]},
    imageurl:{type:String, required:true}
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true

});

export const ShoeModel= model<shoe>('shoe', shoeSchema);
