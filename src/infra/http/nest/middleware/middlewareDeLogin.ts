import {
    Injectable,
    NestMiddleware,
} from "@nestjs/common"
import {Response, Request, NextFunction} from 'express';
import jwt from "jsonwebtoken"
import TokenModel from '../../../repository/mongoDB/models/MongooseModelBlackList';

@Injectable()
export class loginRequired implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({msg:"Você deve estar logado para acessar esta pagina"})
    }
    if (!jwt.verify(token, process.env.secretJWTkey))
        return res.status(401).json({msg:'Token inválido'})
    const returnToken = TokenModel.findOne({bannedToken: token})
    if (!returnToken){
        return res.status(401).json({msg:'Token expirado'})
    }
    next();
    }
}