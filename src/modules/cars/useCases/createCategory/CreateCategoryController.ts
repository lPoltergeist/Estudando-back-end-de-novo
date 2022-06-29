import { Response, Request} from 'express';
import { container } from 'tsyringe';
import {CreateCategoryUseCase} from './CreateCategoryUseCase'

class CreateCategoryController {

async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCases = container.resolve(CreateCategoryUseCase)

    await createCategoryUseCases.execute({name, description});

    return response.status(201).send();
}
}

export {CreateCategoryController}