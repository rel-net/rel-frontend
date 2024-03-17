// CreateContactView.tsx
import { useState, useEffect } from 'react';
import { ContactForm } from '@/views/contacts/ContactForm';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  LinkedIn: string;
  Bio: string;
}

const CreateContactView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<User[]>(users);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('https://0.0.0.0:3000/api/user')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        setSearchedUsers(data.users); // Update searchedUsers after data is fetched
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchedUsers(
      searchTerm === '' // Handle clearing search
        ? users // Reset to all users on empty search
        : users.filter(user =>
            user.FirstName.toLowerCase().includes(searchTerm) ||
            user.LastName.toLowerCase().includes(searchTerm) ||
            user.Email.toLowerCase().includes(searchTerm)
          )
    );
  };

  const fillContactForm = (user: User) => {
    try {
        fetch('https://0.0.0.0:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            IsUser: true,
            ContactUserId: user.ID,
            InvitationSent: false,
            Group: "all"
          }),
        });
  
      } catch (error) {
        console.error('Error creating contact:', error);
      }
  };

  return (
    <div>

      <div className="my-4 p-4 border border-gray-300 rounded">
        <h2 className="text-lg font-semibold mb-4">Step 1: is it User?</h2>
          <div className="flex w-full max-w-sm items-center space-x-2 my-4">
            <Input type="search" placeholder="Search" onChange={handleSearch}/>
          </div>
          <div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {searchedUsers.length > 0 ? (
                searchedUsers.map(user => (
                  <Card key={user.ID} onClick={() => fillContactForm(user)}>
                    <CardHeader>
                      <CardTitle>
                        <Link to={`/user/${user.ID}`} className="text-mygreen hover:underline">
                          <h4 className="font-semibold mb-2">
                            @{`${user.FirstName}.${user.LastName}`.toLowerCase()}
                          </h4>
                        </Link>
                      </CardTitle>
                      <CardDescription>{user.Email}, {user.Bio}</CardDescription>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="my-4 p-4 border border-gray-300 rounded">
                  <span>It seems this person isn't Rel. user yet. Create your contact & send an invitation!</span>
                  <h2 className="text-lg font-semibold mb-4">Create Contact</h2>
                  <ContactForm />
                </div>
              )}
            </div>
          </div>
      </div>
      
    </div>

  );
};

export default CreateContactView;
