import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated, )
specificationsRoutes.post('/', createSpecificationController.handle)

export {specificationsRoutes}