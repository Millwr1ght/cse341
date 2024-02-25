import { Router } from "express";
import *  as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../../swagger.json');

const swagger = Router();
swagger.use('/', swaggerUi.serve);
swagger.get('/', swaggerUi.setup(swaggerDocument));

export default swagger;