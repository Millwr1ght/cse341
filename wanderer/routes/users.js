import { Router } from 'express';
import * as usersController from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', usersController.getAllUsers);

/* --auth-- */
userRouter.get('/login', usersController.logInUser);
userRouter.get('/logout', usersController.logOutUser);

/* --create-- */
userRouter.post('/', usersController.addUser)

/* --read-- */
userRouter.get('/:user_id', usersController.getUserById);

userRouter.get('/list', usersController.getAllUsers);

userRouter.get('/top/:stat', usersController.getTopUsers);

/* --update-- */
userRouter.put('/', usersController.updateUser)

/* --delete-- */
userRouter.delete('/:user_id', usersController.deleteUser)


export default userRouter;