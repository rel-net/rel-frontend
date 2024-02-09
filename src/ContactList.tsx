// ContactList.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Contact {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Name: string;
  LastName: string;
  Email: string;
  Phone: string;
  LinkedIn: string;
}

function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://0.0.0.0:3000/api/contact')
      .then(response => response.json())
      .then(data => setContacts(data.contacts))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map(contact => (
          <div key={contact.ID} className="bg-white p-4 rounded-md shadow-md">
            <Link to={`/contact/${contact.ID}`} className="text-blue-500 hover:underline">
              <h3 className="text-lg font-semibold mb-2">{contact.Name} {contact.LastName}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContactList;
