import { Request, Response } from 'express';
import { AutorService } from '../services/autor';
import { IApiResponse, IAutor } from '../types/interfaces';
export class AutorController {
  private autorService: AutorService;

  constructor() {
    this.autorService = new AutorService();
  }

  async crearAutor(req: Request, res: Response): Promise<void> {
    const resultado = await this.autorService.crearAutor(req.body);
    
    if (resultado.success) {
      res.status(201).json(resultado);
    } else {
      res.status(400).json(resultado);
    }
  }

  async obtenerAutores(_req: Request, res: Response): Promise<void> {
    const resultado = await this.autorService.obtenerAutores();
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(500).json(resultado);
    }
  }

  async obtenerAutorPorId(req: Request, res: Response): Promise<void> {
    const resultado = await this.autorService.obtenerAutorPorId(req.params.id);
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(resultado.error === 'Autor no encontrado' ? 404 : 500).json(resultado);
    }
  }

  async actualizarAutor(req: Request, res: Response): Promise<void> {
    const resultado = await this.autorService.actualizarAutor(req.params.id, req.body);
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(resultado.error === 'Autor no encontrado' ? 404 : 400).json(resultado);
    }
  }

  async eliminarAutor(req: Request, res: Response): Promise<void> {
    try {
      const resultado: IApiResponse<IAutor> = await this.autorService.eliminarAutor(req.params.id);
      
      if (resultado.success) {
        res.json(resultado);
      } else {
        res.status(resultado.error === 'Autor no encontrado' ? 404 : 400).json(resultado);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ 
          success: false, 
          error: error.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: 'An unknown error occurred' 
        });
      }
    }
  }
}