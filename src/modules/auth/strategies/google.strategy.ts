import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:"http://localhost:3000/auth/google/callback",
            scope: ['email','profile']
        })
    }

    async validate(accessToken:string , refreshToken:string , profile:any,cb:VerifyCallback){
        console.log(profile,accessToken,refreshToken);
        return cb(null,profile)
    }
}