import mongoose, { Document } from 'mongoose';

export interface IAutor {
  nombre: string;
  apellido: string;
  fechaNacimiento?: Date;
  nacionalidad?: string;
  biografia?: string;
}

export interface IAutorDocument extends IAutor, Document {
  _id: mongoose.Types.ObjectId;
}

export interface ILibro {
  titulo: string;
  anioPublicacion?: number;
  genero?: string;
  sinopsis?: string;
  paginas?: number;
  autor: mongoose.Types.ObjectId | IAutorDocument;
}

export interface ILibroDocument extends ILibro, Document {
  _id: mongoose.Types.ObjectId;
}

// Tipos para respuestas
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IEstadisticasAutor {
  autorId: mongoose.Types.ObjectId;
  nombreCompleto: string;
  totalLibros: number;
  paginasPromedio: number;
  libroMasAntiguo?: number;
  libroMasReciente?: number;
  generos: string[];
}

export interface IEstadisticasGenero {
  genero: string;
  cantidadLibros: number;
  cantidadAutores: number;
  paginasPromedio: number;
  librosMasRecientes: Array<{
    titulo: string;
    anio: number;
  }>;
}