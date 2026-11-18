import { useState, useEffect } from 'react';

const DAFTAR_JURUSAN = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Rekayasa Perangkat Lunak',
  'Teknik Komputer dan Jaringan',
  'Multimedia',
];

export default function SiswaForm({ onSubmit, editingSiswa, onCancelEdit }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    tgl_siswa: '',
    jurusan_siswa: '',
    alamat_siswa: '',
  });

  useEffect(() => {
    if (editingSiswa) {
      setFormData(editingSiswa);
    } else {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: '',
        alamat_siswa: '',
      });
    }
  }, [editingSiswa]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: '',
        alamat_siswa: '',
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>
          {editingSiswa ? `Edit Siswa: ${editingSiswa.kode_siswa}` : 'Form Tambah Data Siswa'}
        </h3>
        <span style={editingSiswa ? styles.badgeEdit : styles.badgeNew}>
          {editingSiswa ? 'Mode Edit' : 'Input Baru'}
        </span>
      </div>

      <div style={styles.gridRow}>
        <div style={styles.group}>
          <label style={styles.label}>Kode / ID Siswa</label>
          <input
            type="text"
            name="kode_siswa"
            placeholder="Contoh: SIS-001"
            value={formData.kode_siswa}
            onChange={handleChange}
            disabled={!!editingSiswa}
            style={{
              ...styles.input,
              backgroundColor: editingSiswa ? '#f1f5f9' : '#ffffff',
            }}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Nama Lengkap Siswa</label>
          <input
            type="text"
            name="nama_siswa"
            placeholder="Masukkan nama lengkap"
            value={formData.nama_siswa}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.gridRow}>
        <div style={styles.group}>
          <label style={styles.label}>Tanggal Lahir</label>
          <input
            type="date"
            name="tgl_siswa"
            value={formData.tgl_siswa}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Jurusan</label>
          <select
            name="jurusan_siswa"
            value={formData.jurusan_siswa}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">-- Pilih Jurusan --</option>
            {DAFTAR_JURUSAN.map((jurusan) => (
              <option key={jurusan} value={jurusan}>
                {jurusan}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Alamat Lengkap</label>
        <textarea
          name="alamat_siswa"
          placeholder="Masukkan alamat domisili lengkap"
          value={formData.alamat_siswa}
          onChange={handleChange}
          rows="2"
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button type="submit" style={editingSiswa ? styles.btnUpdate : styles.btnPrimary}>
          {editingSiswa ? 'Simpan Perubahan' : '+ Tambah Data Siswa'}
        </button>
        {editingSiswa && (
          <button type="button" onClick={onCancelEdit} style={styles.btnSecondary}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
    border: '1px solid #e2e8f0',
    marginBottom: '28px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f1f5f9',
  },
  title: { margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '700' },
  badgeNew: {
    background: '#eff6ff',
    color: '#1d4ed8',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600',
  },
  badgeEdit: {
    background: '#fef3c7',
    color: '#b45309',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '14px',
  },
  group: { marginBottom: '14px' },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '13px',
    color: '#334155',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
  },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '8px' },
  btnPrimary: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '11px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  btnUpdate: {
    background: '#d97706',
    color: '#ffffff',
    border: 'none',
    padding: '11px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  btnSecondary: {
    background: '#f1f5f9',
    color: '#475569',
    border: '1px solid #cbd5e1',
    padding: '11px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
};