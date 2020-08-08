import NavBar from '../components/navbar';
import TaskCard from '../components/task-card';
import { sessionChecker } from '../lib/auth/sessionChecker';

const Dashboard = () => (
  <>
    <NavBar></NavBar>
    <TaskCard></TaskCard>
  </>
);

export const getServerSideProps = (ctx) => sessionChecker(ctx);

export default Dashboard;
