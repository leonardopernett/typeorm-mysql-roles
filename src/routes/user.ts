import {Router} from 'express'
import {UserController} from '../controller/UserController'
import { checkToken } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

const router = Router();


//get all 
router.get('/',[checkToken], UserController.getAll)
router.get('/:id', UserController.getById)
router.post('/',[checkToken, checkRole('admin') ], UserController.createUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router