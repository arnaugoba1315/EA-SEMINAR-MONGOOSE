import mongoose, { Schema, model } from 'mongoose';
import { ILibro, ILibroDocument } from '../types/interfaces';

const libroSchema = new Schema<ILibroDocument>(
  {
    titulo: { type: String, required: true },
    anioPublicacion: { type: Number },
    genero: { type: String },
    sinopsis: { type: String },
    paginas: { type: Number },
    autor: { 
      type: Schema.Types.ObjectId, 
      ref: 'Autor', 
      required: true 
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model<ILibroDocument>('Libro', libroSchema);