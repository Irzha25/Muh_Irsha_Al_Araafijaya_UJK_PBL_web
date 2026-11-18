import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});