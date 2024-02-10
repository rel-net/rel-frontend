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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription>
            Create a new note for {contact?.Name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Contact
            </Label>
            <Input id="content" value={content} onChange={handleContentChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSubmit} type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div> 
    </div>
  );
};

export default ShowContact;
