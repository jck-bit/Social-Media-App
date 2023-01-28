import mongoose from "mongoose";

const { DATABASE_URL } = process.env

export const connect = async () => {
    if (!DATABASE_URL) {
        throw new Error("DATABSE_URL is not defined");
    }
    try {
        const conn = await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("MongoDB connection established");
        
        const UserSchema = new mongoose.Schema({
            username: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
        });
        
        const PostSchema = new mongoose.Schema({
            userId:{type:String, required:true, select: true},
            username:{type:String, required:true, select: true},
            email:{type:String, required:true, select: true},
            content:{type:String, required:true, select: true},
            date:{type:Date, default: new Date()},
            likes: { type: Map, of:Boolean },
        }, {timestamps: true})


        const User = mongoose.models.User || mongoose.model("User", UserSchema);
        const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
       
        return { User, Post,conn };
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        throw error;
    }
};
