import { Request, Response } from 'express';
import { LibroService } from '../services/libro';

export class LibroController {
  private libroService: LibroService;

  constructor() {
    this.libroService = new LibroService();
  }

  async crearLibro(req: Request, res: Response): Promise<void> {
    const resultado = await this.libroService.crearLibro(req.body);
    
    if (resultado.success) {
      res.status(201).json(resultado);
    } else {
      res.status(400).json(resultado);
    }
  }

  async obtenerLibros(_req: Request, res: Response): Promise<void> {
    const resultado = await this.libroService.obtenerLibros();
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(500).json(resultado);
    }
  }

  async obtenerLibroPorId(req: Request, res: Response): Promise<void> {
    const resultado = await this.libroService.obtenerLibroPorId(req.params.id);
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(resultado.error === 'Libro no encontrado' ? 404 : 500).json(resultado);
    }
  }

  async actualizarLibro(req: Request, res: Response): Promise<void> {
    const resultado = await this.libroService.actualizarLibro(req.params.id, req.body);
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(resultado.error === 'Libro no encontrado' ? 404 : 400).json(resultado);
    }
  }

  async eliminarLibro(req: Request, res: Response): Promise<void> {
    const resultado = await this.libroService.eliminarLibro(req.params.id);
    
    if (resultado.success) {
      res.json(resultado);
    } else {
      res.status(resultado.error === 'Libro no encontrado' ? 404 : 500).json(resultado);
    }
  }
}