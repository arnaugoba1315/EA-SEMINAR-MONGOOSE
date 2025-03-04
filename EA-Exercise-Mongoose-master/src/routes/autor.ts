import { Router } from 'express';
import { AutorController } from '../controllers/autor';

const router = Router();
const autorController = new AutorController();

// Crear un autor
router.post('/', (req, res) => autorController.crearAutor(req, res));

// Listar todos los autores
router.get('/', (req, res) => autorController.obtenerAutores(req, res));

// Ver un autor específico
router.get('/:id', (req, res) => autorController.obtenerAutorPorId(req, res));

// Actualizar autor
router.put('/:id', (req, res) => autorController.actualizarAutor(req, res));

// Eliminar autor
router.delete('/:id', (req, res) => autorController.eliminarAutor(req, res));

export default router;