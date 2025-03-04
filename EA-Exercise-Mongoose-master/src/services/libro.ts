import Libro from '../models/libro';
import Autor from '../models/autor';
import { ILibro, ILibroDocument, IApiResponse } from '../types/interfaces';
import mongoose from 'mongoose';

export class LibroService {
  /**
   * Crear un nuevo libro
   */
  async crearLibro(libroData: ILibro): Promise<IApiResponse<ILibroDocument>> {
    try {
      const autorExiste = await Autor.findById(libroData.autor);
      if (!autorExiste) {
        return {
          success: false,
          error: 'El autor especificado no existe'
        };
      }
      
      const nuevoLibro = new Libro(libroData);
      const libroGuardado = await nuevoLibro.save();
      
      return {
        success: true,
        data: libroGuardado
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
        error: 'Error desconocido al crear el libro'
      };
    }
  }

  /**
   * Obtener todos los libros
   */
  async obtenerLibros(): Promise<IApiResponse<ILibroDocument[]>> {
    try {
      const libros = await Libro.find().populate('autor', 'nombre apellido');
      return {
        success: true,
        data: libros
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
        error: 'Error desconocido al obtener los libros'
      };
    }
  }

  /**
   * Obtener un libro por su ID
   */
  async obtenerLibroPorId(id: string): Promise<IApiResponse<ILibroDocument>> {
    try {
      const libro = await Libro.findById(id).populate('autor');
      if (!libro) {
        return {
          success: false,
          error: 'Libro no encontrado'
        };
      }
      return {
        success: true,
        data: libro
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.CastError) {
        return {
          success: false,
          error: 'ID de libro inválido'
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
        error: 'Error desconocido al obtener el libro'
      };
    }
  }

  /**
   * Actualizar un libro
   */
  async actualizarLibro(id: string, libroData: Partial<ILibro>): Promise<IApiResponse<ILibroDocument>> {
    try {
      if (libroData.autor) {
        const autorExiste = await Autor.findById(libroData.autor);
        if (!autorExiste) {
          return {
            success: false,
            error: 'El autor especificado no existe'
          };
        }
      }
      
      const libroActualizado = await Libro.findByIdAndUpdate(
        id,
        libroData,
        { new: true, runValidators: true }
      );
      
      if (!libroActualizado) {
        return {
          success: false,
          error: 'Libro no encontrado'
        };
      }
      
      return {
        success: true,
        data: libroActualizado
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
        error: 'Error desconocido al actualizar el libro'
      };
    }
  }

  /**
   * Eliminar un libro
   */
  async eliminarLibro(id: string): Promise<IApiResponse<null>> {
    try {
      const libroEliminado = await Libro.findByIdAndDelete(id);
      if (!libroEliminado) {
        return {
          success: false,
          error: 'Libro no encontrado'
        };
      }
      
      return {
        success: true,
        data: null,
        message: 'Libro eliminado correctamente'
      };
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.CastError) {
        return {
          success: false,
          error: 'ID de libro inválido'
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
        error: 'Error desconocido al eliminar el libro'
      };
    }
  }
}