import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/database';

// Importación de rutas
import autorRoutes from './routes/autor';
import libroRoutes from './routes/libro';
import estadisticasRoutes from './routes/estadisticas';

// Inicialización de la app
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(bodyParser.json());

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/autores', autorRoutes);
app.use('/libros', libroRoutes);
app.use('/estadisticas', estadisticasRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});