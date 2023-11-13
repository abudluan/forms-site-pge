import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Form1 from './components/Form1/Form1';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route exact path='/' element={<Form1 />} />
        
      </Routes>
    </Router>
  );
}

export default App;
