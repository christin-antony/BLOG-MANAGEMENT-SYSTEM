import mongoose from 'mongoose'
const Schema = new mongoose.Schema({ 
       
    title:{type:String,required:true},
    description:{type:String,required:true,},
    date:{type:String,required:true},
    image:{type:String},

    
},{timestamps:true})

export const blogSchema = mongoose.model('blog',Schema)