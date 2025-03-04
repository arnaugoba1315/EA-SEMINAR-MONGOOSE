import Libro from '../models/libro';
import { IApiResponse, IEstadisticasAutor, IEstadisticasGenero } from '../types/interfaces';
import mongoose from 'mongoose';

export class EstadisticasService {
  /**
   * Obtener estadísticas de libros agrupadas por autor
   */
  async obtenerEstadisticasPorAutor(): Promise<IApiResponse<IEstadisticasAutor[]>> {
    try {
      const estadisticas = await Libro.aggregate([
        {
          $lookup: {
            from: 'autors',
            localField: 'autor',
            foreignField: '_id',
            as: 'autorInfo'
          }
        },
        {
          $unwind: '$autorInfo'
        },
        {
          $group: {
            _id: { autorId: '$autor', nombre: '$autorInfo.nombre', apellido: '$autorInfo.apellido' },
            totalLibros: { $sum: 1 },
            paginasPromedio: { $avg: '$paginas' },
            libroMasAntiguo: { $min: '$anioPublicacion' },
            libroMasReciente: { $max: '$anioPublicacion' },
            generos: { $addToSet: '$genero' }
          }
        },
        {
          $project: {
            _id: 0,
            autorId: '$_id.autorId',
            nombreCompleto: { $concat: ['$_id.nombre', ' ', '$_id.apellido'] },
            totalLibros: 1,
            paginasPromedio: { $round: ['$paginasPromedio', 0] },
            libroMasAntiguo: 1,
            libroMasReciente: 1,
            generos: 1
          }
        },
        {
          $sort: { totalLibros: -1 }
        }
      ]);
      
      return {
        success: true,
        data: estadisticas
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        return {
          success: false,
          error: 'Error de validación en la agregación'
        };
      }
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message
        };
      }
      return {
        success: false,
        error: 'Error desconocido al obtener estadísticas por autor'
      };
    }
  }

  /**
   * Obtener estadísticas de libros agrupadas por género
   */
  async obtenerEstadisticasPorGenero(): Promise<IApiResponse<IEstadisticasGenero[]>> {
    try {
      const estadisticasPorGenero = await Libro.aggregate([
        {
          $group: {
            _id: '$genero',
            cantidadLibros: { $sum: 1 },
            autoresUnicos: { $addToSet: '$autor' },
            paginasPromedio: { $avg: '$paginas' },
            librosMasRecientes: { $push: { titulo: '$titulo', anio: '$anioPublicacion' } }
          }
        },
        {
          $project: {
            _id: 0,
            genero: '$_id',
            cantidadLibros: 1,
            cantidadAutores: { $size: '$autoresUnicos' },
            paginasPromedio: { $round: ['$paginasPromedio', 0] },
            librosMasRecientes: { 
              $slice: [
                { $sortArray: { input: '$librosMasRecientes', sortBy: { anio: -1 } } },
                3
              ]
            }
          }
        },
        {
          $sort: { cantidadLibros: -1 }
        }
      ]);
      
      if (!estadisticasPorGenero || estadisticasPorGenero.length === 0) {
        return {
          success: true,
          data: [],
          message: 'No se encontraron estadísticas por género'
        };
      }

      return {
        success: true,
        data: estadisticasPorGenero
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        return {
          success: false,
          error: 'Error de validación en la agregación por género'
        };
      }
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message
        };
      }
      return {
        success: false,
        error: 'Error desconocido al obtener estadísticas por género'
      };
    }
  }
}