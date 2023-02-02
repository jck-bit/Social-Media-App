import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  try {
    const conn = await mongoose.connect(DATABASE_URL);
    const today = Date.now()

    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle:"full",
    })

    console.log("MongoDB connection established");

    const UserSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      image: { type: String, default: "" },
    });

    const PostSchema = new mongoose.Schema({
      userId: { type: String, required: true, select: true },
      username: { type: String, required: true, select: true },
      email: { type: String, required: true, select: true },
      userImage: {type: String, select:true},
      content: { type: String, required: true, select: true },
      date: {
        type: String,
        select:true,
        default: f.format(today)
      },

      likes: { type: Map, of: Boolean },
    }, {timestamps:true});

    const User = mongoose.models.User || mongoose.model("User", UserSchema);
    const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

    return { User, Post, conn };
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    throw error;
  }
};