
import mongoose from "mongoose";
const postScheme = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    picturePate:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean
        //Here, of: Boolean specifies that the likes field is a Map where the keys can be of any type (since there's no specific of type defined for keys), and the values must be of type Boolean. 
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true});
const Post = mongoose.model("Post",postScheme);
export default Post;