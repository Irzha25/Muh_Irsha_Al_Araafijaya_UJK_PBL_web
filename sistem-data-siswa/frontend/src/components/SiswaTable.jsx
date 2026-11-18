import { useState } from 'react';

export default function SiswaTable({ siswaList, onEdit, onDelete }) {
  const [search, setSearch] = useState('');

  const filteredList = siswaList.filter(
    (s) =>
      s.nama_siswa.toLowerCase().includes(search.toLowerCase()) ||
      s.kode_siswa.toLowerCase().includes(search.toLowerCase()) ||
      s.jurusan_siswa.toLowerCase().includes(search.toLowerCase())
  );

  const formatTanggal = (tgl) => {
    if (!tgl) return '-';
    const date = new Date(tgl);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.tableHeader}>
        <div>
          <h3 style={styles.title}>Daftar Data Siswa</h3>
          <p style={styles.subtitle}>Total terdaftar: {siswaList.length} siswa</p>
        </div>

        <input
          type="text"
          placeholder="Cari kode, nama, atau jurusan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Kode Siswa</th>
              <th style={styles.th}>Nama Siswa</th>
              <th style={styles.th}>Jurusan</th>
              <th style={styles.th}>Tanggal Lahir</th>
              <th style={styles.th}>Alamat</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.empty}>
                  {search ? 'Data pencarian tidak ditemukan.' : 'Belum ada data siswa tersimpan.'}
                </td>
              </tr>
            ) : (
              filteredList.map((siswa, index) => (
                <tr key={siswa.kode_siswa} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <span style={styles.kodeBadge}>{siswa.kode_siswa}</span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>{siswa.nama_siswa}</td>
                  <td style={styles.td}>
                    <span style={styles.jurusanBadge}>{siswa.jurusan_siswa}</span>
                  </td>
                  <td style={styles.td}>{formatTanggal(siswa.tgl_siswa)}</td>
                  <td style={styles.td}>{siswa.alamat_siswa}</td>
                  <td style={{ ...styles.td, textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <button onClick={() => onEdit(siswa)} style={styles.btnEdit}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(siswa.kode_siswa)} style={styles.btnDelete}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
    border: '1px solid #e2e8f0',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '18px',
  },
  title: { margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '700' },
  subtitle: { margin: '4px 0 0', color: '#64748b', fontSize: '13px' },
  searchInput: {
    padding: '9px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    minWidth: '250px',
    outline: 'none',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  thead: { background: '#f8fafc', textAlign: 'left' },
  th: {
    padding: '12px 14px',
    borderBottom: '2px solid #e2e8f0',
    color: '#475569',
    fontWeight: '700',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '14px', color: '#1e293b', verticalAlign: 'middle' },
  kodeBadge: {
    background: '#f1f5f9',
    color: '#0f172a',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '13px',
    fontFamily: 'monospace',
  },
  jurusanBadge: {
    background: '#ecfdf5',
    color: '#047857',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '600',
  },
  empty: { padding: '28px', textAlign: 'center', color: '#94a3b8' },
  btnEdit: {
    background: '#fef3c7',
    color: '#b45309',
    border: '1px solid #fde68a',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    marginRight: '6px',
  },
  btnDelete: {
    background: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
  },
};