import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const {password, email} = request.body;

        const authenticateUseUserCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenticateUseUserCase.execute({password, email});

        return response.json(token)
    }
}

export {AuthenticateUserController}