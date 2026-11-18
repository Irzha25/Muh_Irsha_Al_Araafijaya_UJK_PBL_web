import pool from '../config/db.js';

export const SiswaModel = {
  getAll: async () => {
    const query = `
      SELECT kode_siswa, nama_siswa, alamat_siswa, 
             TO_CHAR(tgl_siswa, 'YYYY-MM-DD') AS tgl_siswa, 
             jurusan_siswa 
      FROM siswa 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getByKode: async (kode_siswa) => {
    const query = `
      SELECT kode_siswa, nama_siswa, alamat_siswa, 
             TO_CHAR(tgl_siswa, 'YYYY-MM-DD') AS tgl_siswa, 
             jurusan_siswa 
      FROM siswa 
      WHERE kode_siswa = $1
    `;
    const result = await pool.query(query, [kode_siswa]);
    return result.rows[0];
  },

  create: async ({ kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa }) => {
    const query = `
      INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING kode_siswa, nama_siswa, alamat_siswa, TO_CHAR(tgl_siswa, 'YYYY-MM-DD') AS tgl_siswa, jurusan_siswa
    `;
    const result = await pool.query(query, [
      kode_siswa,
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa,
    ]);
    return result.rows[0];
  },

  // PUT: Mengganti seluruh kolom sekaligus
  update: async (kode_siswa, { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa }) => {
    const query = `
      UPDATE siswa
      SET nama_siswa = $1, alamat_siswa = $2, tgl_siswa = $3, jurusan_siswa = $4
      WHERE kode_siswa = $5
      RETURNING kode_siswa, nama_siswa, alamat_siswa, TO_CHAR(tgl_siswa, 'YYYY-MM-DD') AS tgl_siswa, jurusan_siswa
    `;
    const result = await pool.query(query, [
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa,
      kode_siswa,
    ]);
    return result.rows[0];
  },

  // PATCH: Mengubah hanya kolom yang dikirim (jika null/undefined, pertahankan nilai lama)
  patch: async (kode_siswa, { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa }) => {
    const query = `
      UPDATE siswa
      SET nama_siswa = COALESCE($1, nama_siswa),
          alamat_siswa = COALESCE($2, alamat_siswa),
          tgl_siswa = COALESCE($3, tgl_siswa),
          jurusan_siswa = COALESCE($4, jurusan_siswa)
      WHERE kode_siswa = $5
      RETURNING kode_siswa, nama_siswa, alamat_siswa, TO_CHAR(tgl_siswa, 'YYYY-MM-DD') AS tgl_siswa, jurusan_siswa
    `;
    const result = await pool.query(query, [
      nama_siswa ?? null,
      alamat_siswa ?? null,
      tgl_siswa ?? null,
      jurusan_siswa ?? null,
      kode_siswa,
    ]);
    return result.rows[0];
  },

  delete: async (kode_siswa) => {
    const query = 'DELETE FROM siswa WHERE kode_siswa = $1 RETURNING kode_siswa';
    const result = await pool.query(query, [kode_siswa]);
    return result.rows[0];
  },
};