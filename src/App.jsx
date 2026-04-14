import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Survey from './pages/Survey';
import CallIntegration from './pages/CallIntegration';
import Completion from './pages/Completion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/call" element={<CallIntegration />} />
        <Route path="/complete" element={<Completion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
