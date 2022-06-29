import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import {inject, injectable} from 'tsyringe';
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {

}

async execute({description, name}: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists) {
        throw new AppError("Category already Exists");
    }

    this.categoriesRepository.create({name, description});

}
}

export { CreateCategoryUseCase }

/**
 * Definir o tipo de retorno
 * Alterar o retorno de erro
 * Acessar o repositório
 */