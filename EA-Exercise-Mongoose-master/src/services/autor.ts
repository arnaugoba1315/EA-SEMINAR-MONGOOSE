import mongoose from 'mongoose';
import Autor from '../models/autor';
import Libro from '../models/libro';
import { IAutor, IAutorDocument, IApiResponse } from '../types/interfaces';

export class AutorService {
  /**
   * Crear un nuevo autor
   */
  async crearAutor(autorData: IAutor): Promise<IApiResponse<IAutorDocument>> {
    try {
      const nuevoAutor = new Autor(autorData);
      const autorGuardado = await nuevoAutor.save();
      return {
        success: true,
        data: autorGuardado
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        return {
          success: false,
          error: 'Error de validación: ' + error.message
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
        error: 'Error desconocido al crear el autor'
      };
    }
  }

  /**
   * Obtener todos los autores
   */
  async obtenerAutores(): Promise<IApiResponse<IAutorDocument[]>> {
    try {
      const autores = await Autor.find();
      return {
        success: true,
        data: autores
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message
        };
      }
      return {
        success: false,
        error: 'Error desconocido al obtener los autores'
      };
    }
  }

  /**
   * Obtener un autor por su ID
   */
  async obtenerAutorPorId(id: string): Promise<IApiResponse<IAutorDocument>> {
    try {
      const autor = await Autor.findById(id);
      if (!autor) {
        return {
          success: false,
          error: 'Autor no encontrado'
        };
      }
      return {
        success: true,
        data: autor
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.CastError) {
        return {
          success: false,
          error: 'ID de autor inválido'
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
        error: 'Error desconocido al obtener el autor'
      };
    }
  }

  /**
   * Actualizar un autor
   */
  async actualizarAutor(id: string, autorData: Partial<IAutor>): Promise<IApiResponse<IAutorDocument>> {
    try {
      const autorActualizado = await Autor.findByIdAndUpdate(
        id,
        autorData,
        { new: true, runValidators: true }
      );
      
      if (!autorActualizado) {
        return {
          success: false,
          error: 'Autor no encontrado'
        };
      }
      
      return {
        success: true,
        data: autorActualizado
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        return {
          success: false,
          error: 'Error de validación: ' + error.message
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
        error: 'Error desconocido al actualizar el autor'
      };
    }
  }

  /**
   * Eliminar un autor y sus libros asociados
   */
  async eliminarAutor(id: string): Promise<IApiResponse<IAutor>> {
    try {
      const autorEliminado = await Autor.findByIdAndDelete(id);
      
      if (!autorEliminado) {
        return {
          success: false,
          error: 'Autor no encontrado'
        };
      }

      return {
        success: true,
        data: autorEliminado
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.CastError) {
        return {
          success: false,
          error: 'ID de autor inválido'
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
        error: 'Error desconocido al eliminar el autor'
      };
    }
  }
}