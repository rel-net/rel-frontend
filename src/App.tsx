// App.tsx

import './App.css'; // Existing styles
import './tailwind.css'; // New styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './ContactList';
import CreateContact from './CreateContact';
import ShowContact from './ShowContact';

function App() {
  return (
    <Router>
      <div className="fixed top-0 w-full gradient-h1 p-4 z-10">
        <h1 className="text-2xl text-white font-bold">Rel.</h1>
      </div>
      <div className="mt-16"> {/* Add top margin to account for the fixed header */}
        <Routes>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contact/create" element={<CreateContact />} />
          <Route path="/contact/:id" element={<ShowContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
