import Dashboard from '../features/admin/Dashboard';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <main className={styles.adminDashboard}>
      <h1>Dashboard</h1>
      <Dashboard />
    </main>
  );
};

export default AdminDashboard;
