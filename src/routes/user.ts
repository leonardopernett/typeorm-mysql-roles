import {Router} from 'express'
import {UserController} from '../controller/UserController'

const router = Router();


//get all 
router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.post('/', UserController.createUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router