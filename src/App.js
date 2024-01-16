import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Form1 from './components/Form1/Form1';
import Form2 from './components/Form2/Form2';
import Form3 from './components/Form3/Form3';
import Form4 from './components/Form4/Form4';
import Form5 from './components/Form5/Form5';

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path='/' element={<Form1 />} />
        <Route exact path='/form2' element={<Form2 />} />
        <Route exact path='/form3' element={<Form3 />} />
        <Route exact path='/form4' element={<Form4 />} />
        <Route exact path='/form5' element={<Form5 />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
