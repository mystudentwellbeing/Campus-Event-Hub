import useUsers from './useUsers';
const Dashboard = () => {
  const { isLoading, users, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const newUsersThisMonth = users?.filter((user) => {
    const userCreatedAt = new Date(user.created_at);
    return userCreatedAt >= firstDayOfMonth && userCreatedAt < now;
  }).length;

  return (
    <>
      <div>Total Number:{users?.length}</div>
      <div>New Users This Month:{newUsersThisMonth}</div>
    </>
  );
};

export default Dashboard;
