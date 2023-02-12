
export interface ResponseFuncs {
    GET?: Function
    POST?: Function;
    PUT?: Function;
    DELETE?:Function;
    PATCH?:Function;
}

export interface User {
    username?: string,
    password?:string,
    email?:string;
    image?:string;
    friends:[]
    _id:string
}

export interface Post{
    content?: string;
    username?:string;
    likes?: [];
    userId?: string    
    id?: string
    userImage?:string
    date?:string;
}