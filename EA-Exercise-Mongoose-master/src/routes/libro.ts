import { Router } from 'express';
import { LibroController } from '../controllers/libro';

const router = Router();
const libroController = new LibroController();

// Crear un libro
router.post('/', (req, res) => libroController.crearLibro(req, res));

// Listar todos los libros
router.get('/', (req, res) => libroController.obtenerLibros(req, res));

// Ver un libro específico
router.get('/:id', (req, res) => libroController.obtenerLibroPorId(req, res));

// Actualizar libro
router.put('/:id', (req, res) => libroController.actualizarLibro(req, res));

// Eliminar libro
router.delete('/:id', (req, res) => libroController.eliminarLibro(req, res));

export default router;