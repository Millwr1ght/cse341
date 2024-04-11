import { Router } from 'express';
import * as usersController from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', usersController.getAllUsers);

/* --create-- */
userRouter.post('/', usersController.addUser)

/* --read-- */
userRouter.get('/:user_id', usersController.getUserById);

userRouter.get('/top/:stat', usersController.getTopUsers);

/* --update-- */
userRouter.put('/', usersController.updateUser)

/* --delete-- */
userRouter.delete('/:user_id', usersController.deleteUser)


export default userRouter;