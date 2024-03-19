import { Router } from 'express';
import * as usersController from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', usersController.getAllUsers);

/* --create-- */
userRouter.post('/add', usersController.addUser)

/* --read-- */
userRouter.get('/:user_id', usersController.getUserById);

/* --update-- */
userRouter.put('/update/:user_id', usersController.updateUser)

/* --delete-- */
userRouter.delete('/delete/:user_id', usersController.deleteUser)


export default userRouter;