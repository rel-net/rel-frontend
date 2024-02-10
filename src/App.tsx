// App.tsx

import './App.css'; // Existing styles
import './tailwind.css'; // New styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './ContactList';
import CreateContact from './CreateContact';
import ShowContact from './ShowContact';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

function App() {
  return (
    <Router>
      <div className="w-full gradient-h1">
        <h1 className="text-4xl font-bold">Rel.</h1>
      </div>
      <div>
      <NavigationMenu>
        <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/contact/create">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Create
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/contacts">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
