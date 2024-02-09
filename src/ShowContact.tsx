// ShowContact.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

interface Note {
  ID: number;
  ContactId: number;
  Date: string;
  Content: string;
}

const ShowContact = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Fetch contact details
    fetch(`http://0.0.0.0:3000/api/contact/${id}`)
      .then(response => response.json())
      .then(data => setContact(data.contact))
      .catch(error => console.error('Error fetching contact details:', error));

    // Fetch contact notes
    fetch(`http://0.0.0.0:3000/api/note/contact/${id}`)
      .then(response => response.json())
      .then(data => setNotes(data.notes))
      .catch(error => console.error('Error fetching contact notes:', error));
  }, [id]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  

  return (
    <div>
      <h2>Contact Details</h2>
      <p>Name: {contact?.Name}</p>
      <p>Last Name: {contact?.LastName}</p>
      <p>Email: {contact?.Email}</p>

      <h3>Contact Notes</h3>
      <ul>
        {notes.map(note => (
          <li key={note.ID}>
            <p>Date: {formatDate(note.Date)}</p>
            <p>Content: {note.Content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowContact;
