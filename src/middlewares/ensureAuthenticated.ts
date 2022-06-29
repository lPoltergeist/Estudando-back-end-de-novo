import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token is missing.")
    }

    const [, token] = authHeader.split(" ");

    try {
      const {sub: user_id} = verify(token, 'c168405dfb5a1c0a4d113d00bc1ea2d2') as IPayload
      const usersRepository = new UsersRepository();
      const user = await usersRepository.findById(user_id)

       if(!user) {
        throw new AppError("User does not exists.")
       }

      next()
    } catch {
        throw new AppError("Invalid token.")
    }
}