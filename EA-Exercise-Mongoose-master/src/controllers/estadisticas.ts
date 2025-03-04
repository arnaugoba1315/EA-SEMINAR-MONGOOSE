import { Request, Response } from 'express';
import { EstadisticasService } from '../services/estadisticas';

export class EstadisticasController {
  private estadisticasService: EstadisticasService;

  constructor() {
    this.estadisticasService = new EstadisticasService();
  }

  async obtenerEstadisticasPorAutor(_req: Request, res: Response): Promise<void> {
    const resultado = await this.estadisticasService.obtenerEstadisticasPorAutor();
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(500).json(resultado);
    }
  }

  async obtenerEstadisticasPorGenero(_req: Request, res: Response): Promise<void> {
    const resultado = await this.estadisticasService.obtenerEstadisticasPorGenero();
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(500).json(resultado);
    }
  }
}
