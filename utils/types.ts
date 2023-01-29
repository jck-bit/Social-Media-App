import { ObjectId } from "mongoose";

export interface ResponseFuncs {
    GET?: Function
    POST?: Function;
    PUT?: Function;
    DELETE?:Function;
    PATCH?:Function;
}

export interface User {
    username: string,
    password:string,
    email:string;
    image:string;
}

export interface Post{
    content: string;
    username:string;
    likes: [];
    date: string;
    userId: string    
    id: string
}