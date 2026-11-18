import express from 'express';
import cors from 'cors';
import siswaRoutes from './routes/siswaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Data Siswa Berjalan di Port 3000' });
});

app.use('/api/siswa', siswaRoutes);

export default app;