import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
       <>
        <Menu />
        <AppRoutes />
      </>
    </Router>
  );
}

export default App
