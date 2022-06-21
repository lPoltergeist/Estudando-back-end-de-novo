import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {
  return createSpecificationController.handle(request, response);
})

export {specificationsRoutes}