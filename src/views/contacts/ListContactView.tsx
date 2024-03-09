// ListContactView.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


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
  IsUser: boolean;
}

function ListContactView() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://0.0.0.0:3000/api/contact')
      .then(response => response.json())
      .then(data => setContacts(data.contacts))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const badgeRender = (isUser: boolean) => {
    if(isUser){
      return <Badge>user</Badge>
    }
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {contacts.map(contact => (
          <Card key={contact.ID}>
          <CardHeader>
          <div className="grid gap-2 grid-cols-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Link to={`/contact/${contact.ID}`} className="text-mygreen hover:underline">
                <h4 className="font-semibold mb-2">@{`${contact.Name}.${contact.LastName}`.toLowerCase()}</h4>
              </Link>
          </div>
          </CardHeader>
          <CardDescription>
            <div className="grid gap-2 grid-cols-4 pb-4">
              <div className='col-span-3'>{contact.Email}</div>
              <div className='col-span-2'>{badgeRender(contact.IsUser)}</div>
            </div>
          </CardDescription>
        </Card>
        
        ))}
      </div>
    </>
  );
}

export default ListContactView;
