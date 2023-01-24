export interface ResponseFuncs {
    GET?: Function
    POST?: Function;
    PUT?: Function;
    DELETE?:Function;
}

export interface User {
    username: string,
    password:string,
    email:string
}
