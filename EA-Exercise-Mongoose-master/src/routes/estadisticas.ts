import { Router } from 'express';
import { EstadisticasController } from '../controllers/estadisticas';

const router = Router();
const estadisticasController = new EstadisticasController();

// Estadísticas por autor
router.get('/autores', (req, res) => estadisticasController.obtenerEstadisticasPorAutor(req, res));

// Estadísticas por género
router.get('/generos', (req, res) => estadisticasController.obtenerEstadisticasPorGenero(req, res));

export default router;