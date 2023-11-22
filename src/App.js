import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Form1 from './components/Form1/Form1';
import Form2 from './components/Form2/Form2';

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path='/' element={<Form1 />} />
        <Route exact path='/form2' element={<Form2 />} />
      </Routes>
    </Router>
  );
}

export default App;
