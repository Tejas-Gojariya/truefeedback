import 'next-auth'

delcare module 'next-auth' {
    interface User{
        _id?: string;
        isVerfied? : boolean;
        isAcceptingMessges?: boolean;
        username?: string
    }
    interface Session {
        user : {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessage?: boolean;
            username?: string
        } & DefualtSession['user']
    }
}


declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAccptingMessages?: boolean
        username?: string
    }
}