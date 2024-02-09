// CreateContact.tsx

import { useState } from 'react';

const CreateContact = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make a POST request to create a new contact
    try {
      const response = await fetch('http://0.0.0.0:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          LastName: lastName,
          Email: email,
        }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('Contact created successfully!');
      } else {
        // Handle errors, e.g., show an error message
        console.error('Error creating contact:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="my-4 p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Create Contact</h2>
      <form onSubmit={handleCreateContact} className="flex flex-col">
        <div className="mb-4 flex items-start">
          <label htmlFor="name" className="w-24 text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-start">
          <label htmlFor="lastName" className="w-24 text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 flex items-start">
          <label htmlFor="email" className="w-24 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Contact
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
