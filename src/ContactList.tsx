// ContactList.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
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

function ContactList() {
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
            <CardTitle><Link to={`/contact/${contact.ID}`} className="text-mygreen hover:underline">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="font-semibold mb-2">@{`${contact.Name}.${contact.LastName}`.toLowerCase()}</h4>
            </Link></CardTitle>
            <CardDescription>
              {contact.Email} 
              {contact.Phone}
              {contact.LinkedIn}
              {badgeRender(contact.IsUser)}
            </CardDescription>
          </CardHeader>
        </Card>
        
        ))}
      </div>
    </>
  );
}

export default ContactList;
