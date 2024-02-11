// CreateContact.tsx

import { ContactForm } from './ContactForm';

const CreateContact = () => {
  return (
    <div className="my-4 p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Create Contact</h2>
      <ContactForm />
    </div>
  );
};

export default CreateContact;
