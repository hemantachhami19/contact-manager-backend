import { Router } from 'express';
import ContactController from '../controllers/ContactController';

const router = Router();

router.get('/', ContactController.getAllContacts);
router.post('/', ContactController.addContact);
router.get('/:id', ContactController.getAContact);
router.put('/:id', ContactController.updatedContact);
router.delete('/:id', ContactController.deleteContact);

export default router;