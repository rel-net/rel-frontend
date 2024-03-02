// UserList.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://0.0.0.0:3000/api/user')
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {users.map(user => (
          <Card key={user.ID}>
          <CardHeader>
            <CardTitle><Link to={`/user/${user.ID}`} className="text-mygreen hover:underline">
              <h4 className="font-semibold mb-2">@{`${user.FirstName}.${user.LastName}`.toLowerCase()}</h4>
            </Link></CardTitle>
            <CardDescription>{user.Email}, {user.Bio}</CardDescription>
          </CardHeader>
        </Card>
        
        ))}
      </div>
    </>
  );
}
