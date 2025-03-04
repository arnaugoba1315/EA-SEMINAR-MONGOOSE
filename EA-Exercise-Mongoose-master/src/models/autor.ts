import mongoose, { Schema, model } from 'mongoose';
import { IAutor, IAutorDocument } from '../types/interfaces';

const autorSchema = new Schema<IAutorDocument>(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date },
    nacionalidad: { type: String },
    biografia: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model<IAutorDocument>('Autor', autorSchema);