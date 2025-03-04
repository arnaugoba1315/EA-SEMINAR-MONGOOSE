import mongoose from 'mongoose';
import { AutorService } from '../services/autor';
import { IAutor } from '../types/interfaces';

describe('AutorService', () => {
  let autorService: AutorService;
  
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test_database');
    autorService = new AutorService();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  it('debería crear un nuevo autor', async () => {
    const autorData: IAutor = {
      nombre: 'Jorge Luis',
      apellido: 'Borges',
      nacionalidad: 'Argentina'
    };

    const resultado = await autorService.crearAutor(autorData);

    expect(resultado.success).toBe(true);
    expect(resultado.data).toHaveProperty('_id');
    expect(resultado.data?.nombre).toBe('Jorge Luis');
    expect(resultado.data?.apellido).toBe('Borges');
  });

  it('debería obtener todos los autores', async () => {
    // Crear algunos autores de prueba
    await autorService.crearAutor({ nombre: 'Gabriel', apellido: 'García Márquez', nacionalidad: 'Colombia' });
    await autorService.crearAutor({ nombre: 'Jorge Luis', apellido: 'Borges', nacionalidad: 'Argentina' });

    const resultado = await autorService.obtenerAutores();
    
    expect(resultado.success).toBe(true);
    expect(Array.isArray(resultado.data)).toBe(true);
    expect(resultado.data?.length).toBe(2);
  });
});