import { SiswaModel } from '../models/siswaModel.js';

export const SiswaController = {
  getAllSiswa: async (req, res) => {
    try {
      const data = await SiswaModel.getAll();
      res.status(200).json({
        success: true,
        message: 'Data siswa berhasil diambil',
        total: data.length,
        data,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getSiswaByKode: async (req, res) => {
    try {
      const { kode } = req.params;
      const siswa = await SiswaModel.getByKode(kode);

      if (!siswa) {
        return res.status(404).json({
          success: false,
          message: `Siswa dengan kode ${kode} tidak ditemukan`,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Detail siswa ditemukan',
        data: siswa,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createSiswa: async (req, res) => {
    try {
      const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      if (
        !kode_siswa?.trim() ||
        !nama_siswa?.trim() ||
        !alamat_siswa?.trim() ||
        !tgl_siswa?.trim() ||
        !jurusan_siswa?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: 'Semua kolom (Kode, Nama, Alamat, Tanggal Lahir, dan Jurusan) wajib diisi!',
        });
      }

      const kodeFormatted = kode_siswa.trim().toUpperCase();

      const existing = await SiswaModel.getByKode(kodeFormatted);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Kode Siswa ${kodeFormatted} sudah terdaftar!`,
        });
      }

      const newSiswa = await SiswaModel.create({
        kode_siswa: kodeFormatted,
        nama_siswa: nama_siswa.trim(),
        alamat_siswa: alamat_siswa.trim(),
        tgl_siswa: tgl_siswa.trim(),
        jurusan_siswa: jurusan_siswa.trim(),
      });

      res.status(201).json({
        success: true,
        message: 'Data siswa berhasil ditambahkan',
        data: newSiswa,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT: Wajib mengirim seluruh kolom
  updateSiswa: async (req, res) => {
    try {
      const { kode } = req.params;
      const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      if (
        !nama_siswa?.trim() ||
        !alamat_siswa?.trim() ||
        !tgl_siswa?.trim() ||
        !jurusan_siswa?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: 'Untuk metode PUT, Nama, Alamat, Tanggal Lahir, dan Jurusan wajib diisi lengkap!',
        });
      }

      const existing = await SiswaModel.getByKode(kode);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: `Siswa dengan kode ${kode} tidak ditemukan`,
        });
      }

      const updatedSiswa = await SiswaModel.update(kode, {
        nama_siswa: nama_siswa.trim(),
        alamat_siswa: alamat_siswa.trim(),
        tgl_siswa: tgl_siswa.trim(),
        jurusan_siswa: jurusan_siswa.trim(),
      });

      res.status(200).json({
        success: true,
        message: 'Seluruh data siswa berhasil diperbarui (PUT)',
        data: updatedSiswa,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH: Cukup mengirim kolom yang ingin diubah saja
  patchSiswa: async (req, res) => {
    try {
      const { kode } = req.params;
      const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      if (
        nama_siswa === undefined &&
        alamat_siswa === undefined &&
        tgl_siswa === undefined &&
        jurusan_siswa === undefined
      ) {
        return res.status(400).json({
          success: false,
          message: 'Minimal satu kolom (nama_siswa, alamat_siswa, tgl_siswa, atau jurusan_siswa) harus dikirim!',
        });
      }

      if (
        (nama_siswa !== undefined && !nama_siswa.trim()) ||
        (alamat_siswa !== undefined && !alamat_siswa.trim()) ||
        (tgl_siswa !== undefined && !tgl_siswa.trim()) ||
        (jurusan_siswa !== undefined && !jurusan_siswa.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: 'Kolom yang diubah tidak boleh berisi teks kosong!',
        });
      }

      const existing = await SiswaModel.getByKode(kode);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: `Siswa dengan kode ${kode} tidak ditemukan`,
        });
      }

      const patchedSiswa = await SiswaModel.patch(kode, {
        nama_siswa: nama_siswa?.trim(),
        alamat_siswa: alamat_siswa?.trim(),
        tgl_siswa: tgl_siswa?.trim(),
        jurusan_siswa: jurusan_siswa?.trim(),
      });

      res.status(200).json({
        success: true,
        message: 'Sebagian data siswa berhasil diperbarui (PATCH)',
        data: patchedSiswa,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteSiswa: async (req, res) => {
    try {
      const { kode } = req.params;
      const deleted = await SiswaModel.delete(kode);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Siswa dengan kode ${kode} tidak ditemukan`,
        });
      }

      res.status(200).json({
        success: true,
        message: `Data siswa ${kode} berhasil dihapus`,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};