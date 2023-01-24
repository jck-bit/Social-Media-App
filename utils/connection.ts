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

        const User = mongoose.models.User || mongoose.model("User", UserSchema);

       
        return { User, conn };
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        throw error;
    }
};
