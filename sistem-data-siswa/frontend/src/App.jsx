import { useState, useEffect } from 'react';
import { siswaApi } from './services/api';
import SiswaForm from './components/SiswaForm';
import SiswaTable from './components/SiswaTable';

export default function App() {
  const [siswaList, setSiswaList] = useState([]);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 3500);
  };

  const fetchSiswa = async () => {
    try {
      const response = await siswaApi.getAll();
      setSiswaList(response.data.data || []);
    } catch (error) {
      showAlert('error', 'Gagal terhubung ke server backend (Port 3000)');
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  const handleSave = async (formData, resetForm) => {
    try {
      if (editingSiswa) {
        const res = await siswaApi.update(editingSiswa.kode_siswa, formData);
        showAlert('success', res.data.message);
        setEditingSiswa(null);
      } else {
        const res = await siswaApi.create(formData);
        showAlert('success', res.data.message);
      }
      resetForm();
      fetchSiswa();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Terjadi kesalahan pada server';
      showAlert('error', errorMsg);
    }
  };

  const handleDelete = async (kode) => {
    if (!window.confirm(`Yakin ingin menghapus data siswa ${kode}?`)) return;
    try {
      const res = await siswaApi.delete(kode);
      showAlert('success', res.data.message);
      fetchSiswa();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Gagal menghapus data';
      showAlert('error', errorMsg);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <span style={styles.tag}>SKKNI Fullstack Web Developer</span>
          <h1 style={styles.headerTitle}>Sistem Manajemen Data Siswa</h1>
          <p style={styles.headerSubtitle}>
            Aplikasi CRUD Terintegrasi Express.js, PostgreSQL & React
          </p>
        </div>
      </header>

      <main style={styles.container}>
        {alert.message && (
          <div
            style={{
              ...styles.alert,
              background: alert.type === 'error' ? '#fef2f2' : '#f0fdf4',
              color: alert.type === 'error' ? '#991b1b' : '#166534',
              borderColor: alert.type === 'error' ? '#fecaca' : '#bbf7d0',
            }}
          >
            {alert.message}
          </div>
        )}

        <SiswaForm
          onSubmit={handleSave}
          editingSiswa={editingSiswa}
          onCancelEdit={() => setEditingSiswa(null)}
        />

        <SiswaTable
          siswaList={siswaList}
          onEdit={(siswa) => {
            setEditingSiswa(siswa);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    paddingBottom: '60px',
  },
  header: {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: '#ffffff',
    padding: '36px 20px',
    marginBottom: '32px',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.15)',
  },
  headerContent: { maxWidth: '1000px', margin: '0 auto' },
  tag: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.18)',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  headerTitle: { margin: '0 0 6px', fontSize: '26px', fontWeight: '800' },
  headerSubtitle: { margin: 0, fontSize: '14px', opacity: 0.9 },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '0 20px' },
  alert: {
    padding: '14px 18px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid',
    fontWeight: '600',
    fontSize: '14px',
  },
};