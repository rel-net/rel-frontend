// ShowContact.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Textarea } from "@/components/ui/textarea"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { Button } from "@/components/ui/button"


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

const createNote = async (contactId:number|undefined, content: string) => {
  try {
    const response = await fetch(`http://0.0.0.0:3000/api/note/contact/${contactId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Content: content,
      }),
    });

    if (response.ok) {
      console.log('Note created successfully!');
      // Optionally, you can perform additional actions after successful creation.
    } else {
      console.error('Error creating note:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating note:', error);
  }
};


const ShowContact = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDelete, setIsDelete] = useState<number>(0);
  const [content, setContent] = useState('Note...');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // Assuming you have the contact ID available
    const contactId = contact?.ID;

    // Call the createNote function to make the POST request
    createNote(contactId, content);

    // Optionally, close the dialog or perform other actions after submission.
  };

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

      if(isDelete){
        fetch(`http://0.0.0.0:3000/api/contact/${id}`, {
          method: 'DELETE',
        })
          .then(() => {
            console.log('Contact deleted successfully!');
            navigate('/contacts');
            // Optionally, you can update the state or perform any other actions after successful deletion.
          })
          .catch(error => console.error('Error deleting contact:', error));
      }
  }, [id, isDelete, navigate, notes]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  
  

  return (
    <div>
      <Card key={contact?.ID}>
          <CardHeader>
            <CardTitle>
              <h4 className="font-semibold mb-2">@{`${contact?.Name}.${contact?.LastName}`.toLowerCase()}</h4>
            </CardTitle>
            <CardDescription>{contact?.Email}</CardDescription>
            <CardContent className='text-left'>
              <p>{contact?.Name}</p>
              <p>{contact?.LastName}</p>
            </CardContent>
          </CardHeader>
      </Card>
      <Accordion type="single" collapsible>
      {notes.map(note => (
        <AccordionItem value={note.ID.toString()}>
        <AccordionTrigger>Note {note.ID.toString()}</AccordionTrigger>
        <AccordionContent>
          {note.Content}
        </AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>
      <div>
          <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Contact</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to delete {contact?.Name}?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the contact information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setIsDelete(1)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div> 
      <div>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Create Note</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="sm:max-h-[800px]">
            <SheetHeader>
              <SheetTitle>Create Note</SheetTitle>
              <SheetDescription>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="content">
                    Contact
                  </Label>
                  <Textarea id="content" placeholder="Type your message here." onChange={handleContentChange} className="col-span-3"/>
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='py-10'>
              <SheetClose asChild>
              <Button onClick={handleSubmit} type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div> 
    </div>
  );
};

export default ShowContact;
