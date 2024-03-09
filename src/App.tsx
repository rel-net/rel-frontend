// App.tsx

import './App.css'; // Existing styles
import './tailwind.css'; // New styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ListContactView from './views/contacts/ListContactView';
import CreateContactView from './views/contacts/CreateContactView';
import ContactView from './views/contacts/ContactView';
import LoginView from './views/login/LoginView';
import { useAuth } from './AuthContext';
import { Button } from './components/ui/button';




function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    console.log(storedSessionId)
    if (storedSessionId) {
        setIsAuthenticated(true);
    }
}, [setIsAuthenticated]);

  return (
    <Router>
      <div className='grid md:grid-cols-1'>
        <div id="header" className='w-full flex grid grid-cols-12'>
          <div className='col-span-3'>
            <div className="items-left justify-left mb-20">
              <h1 className="text-4xl font-bold gradient-h1">Rel.</h1>
            </div>
          </div>
          <div id="main-container" className='col-span-9'>
            <div>Search</div>
          </div>
        </div>
        <div id="body" className='w-full flex grid md:grid-cols-6 sm:grid-cols-1'>
          <div className='col-span-1'>
            <div className='py-10'>
              <h2>Today</h2>
            </div>
            <div className='py-10'>
              <h2><a href='/contacts'>Contacts</a></h2>
            </div>
            <div className='py-1'>
              <Button><a href='/contact/create'>Create Contact</a></Button>
            </div>
            <div className='py-1'>
              <Button disabled={true}><a href='#'>Create Note</a></Button>
            </div>
            <div className='py-1'>
              <Button disabled={true}><a href='#'>Create Reminder</a></Button>
            </div>
          </div>
          <div className='grid col-span-5'>
            {/* Render LoginView by default when not authenticated */}
            {!isAuthenticated && <LoginView />}
            {isAuthenticated && (
              <Routes>
                <Route path="/contacts" element={<ListContactView />} />
                <Route path="/contact/create" element={<CreateContactView />} />
                <Route path="/contact/:id" element={<ContactView />} />
              </Routes>
            )}
          </div>
          </div>
      </div>
    </Router>
  );
}

export default App;
