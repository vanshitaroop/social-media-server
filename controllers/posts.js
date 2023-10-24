import Post from "../models/Posts.js";
import User from "../models/User.js";

//create a post
export const createPost = async (req,res) =>{
    try {
        const {userId,description,picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName:user,firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();
        const post = Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({msg:error.message})
    }
}
export const getFeedPosts = async (req,res)=>{
    try {
        const post = Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
export const getUserPosts = async (req,res) =>{
    try {
        const {userId} = req.params;
        const post = Post.find(userId);
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}
export const likePost = async (req,res) =>{
    try {
        const { id } = req.params;
        // this will be the posts id
        const { userId } =req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked){
            post.likes.delete(userId)
        }
        else{
            post.likes.set(userId,true);
        }//set get delete is a map ka functions
        const updatedPosts = await findByIdAndUpdate(
            id,
            {like:post.likes},
            {new:true}
        )
        res.status(200).json(updatedPosts);
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}