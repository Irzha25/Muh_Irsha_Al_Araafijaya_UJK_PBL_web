import express from 'express';
import { SiswaController } from '../controllers/siswaController.js';

const router = express.Router();

router.get('/', SiswaController.getAllSiswa);
router.get('/:kode', SiswaController.getSiswaByKode);
router.post('/', SiswaController.createSiswa);
router.put('/:kode', SiswaController.updateSiswa);
router.patch('/:kode', SiswaController.patchSiswa);
router.delete('/:kode', SiswaController.deleteSiswa);

export default router;