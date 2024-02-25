import { Router } from "express";
import *  as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' }

const swagger = Router();
swagger.use('/', swaggerUi.serve);
swagger.get('/', swaggerUi.setup(swaggerDocument));

export default swagger;