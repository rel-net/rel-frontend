// ShowContact.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown'
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

interface Reminder {
  ID: number;
  ContactId: number;
  Date: string;
  Todo: string;
  Status: string;
}

const deleteNote = async (noteId:number|undefined) => {
    fetch(`http://0.0.0.0:3000/api/note/${noteId}`, {
          method: 'DELETE',
        })
          .then(() => {
            console.log('Note deleted successfully!');
            // Optionally, you can update the state or perform any other actions after successful deletion.
          })
          .catch(error => console.error('Error deleting contact:', error));
};

const deleteReminder = async (reminderId:number|undefined) => {
  fetch(`http://0.0.0.0:3000/api/reminder/${reminderId}`, {
        method: 'DELETE',
      })
        .then(() => {
          console.log('Reminder deleted successfully!');
          // Optionally, you can update the state or perform any other actions after successful deletion.
        })
        .catch(error => console.error('Error deleting contact:', error));
};

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

const createReminder = async (contactId:number|undefined, todo: string) => {
  const now = new Date();

  const formattedDate = now.toISOString();
  try {
    const response = await fetch(`http://0.0.0.0:3000/api/reminder/contact/${contactId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Todo: todo,
        Date: formattedDate
      }),
    });

    if (response.ok) {
      console.log('Reminder created successfully!');
      // Optionally, you can perform additional actions after successful creation.
    } else {
      console.error('Error creating reminder:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating reminder:', error);
  }
};


const ShowContact = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isDeleteContact, setIsDeleteContact] = useState<number>(0);
  const [content, setContent] = useState('Note...');
  const [todo, setTodo] = useState("Todo...");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTodoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    // Assuming you have the contact ID available
    const contactId = contact?.ID;

    // Call the createNote function to make the POST request
    createNote(contactId, content);

    // Optionally, close the dialog or perform other actions after submission.
  };

  const handleSubmitReminder = () => {
    // Assuming you have the contact ID available
    const contactId = contact?.ID;

    // Call the createNote function to make the POST request
    createReminder(contactId, todo);

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

    // Fetch contact reminders
    fetch(`http://0.0.0.0:3000/api/reminder/contact/${id}`)
      .then(response => response.json())
      .then(data => setReminders(data.reminders))
      .catch(error => console.error('Error fetching contact reminder:', error));

      console.log(reminders)

      if(isDeleteContact){
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

      
  }, [isDeleteContact, id, navigate]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  
  

  return (
    <div className='grid gap-4 grid-cols-1'>
      <Card key={contact?.ID} className='w-full'>
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
      {/* REMINDERS */}
      <Accordion type="single" collapsible>
      {reminders.map(reminder => (
        <AccordionItem value={reminder.ID.toString()}>
        <AccordionTrigger>Reminder {reminder.ID.toString()} - {formatDate(reminder.Date)}</AccordionTrigger>
        <AccordionContent>
          <div className='grid gap-2 lg:grid-cols-8 sm:grid-cols-1 mt-6'>
            <div className='text-left lg:border p-8 lg:border-gray-300 rounded lg:col-span-6 sm:col-span-8'>
            
            <Markdown className="markdown-render">{ reminder.Todo}</Markdown>
            </div>
            <div className='lg:col-span-2 sm:col-span-8'>
              <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Reminder</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to delete this reminder?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the reminder.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteReminder(reminder.ID)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </div>
          
          
        </AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>

      {/* NOTES */}
      <Accordion type="single" collapsible>
      {notes.map(note => (
        <AccordionItem value={note.ID.toString()}>
        <AccordionTrigger>Note {note.ID.toString()} - {formatDate(note.Date)}</AccordionTrigger>
        <AccordionContent>
          <div className='grid gap-2 lg:grid-cols-8 sm:grid-cols-1 mt-6'>
            <div className='text-left lg:border p-8 lg:border-gray-300 rounded lg:col-span-6 sm:col-span-8'>
            
            <Markdown className="markdown-render">{ note.Content}</Markdown>
            </div>
            <div className='lg:col-span-2 sm:col-span-8'>
              <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Note</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to delete this note?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the note content.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteNote(note.ID)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </div>
          
          
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
              <AlertDialogAction onClick={() => setIsDeleteContact(1)}>Continue</AlertDialogAction>
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
      <div>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Create Reminder</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="sm:max-h-[800px]">
            <SheetHeader>
              <SheetTitle>Create Reminder</SheetTitle>
              <SheetDescription>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="todo">
                    Reminder
                  </Label>
                  <Textarea id="todo" placeholder="Type your message here." onChange={handleTodoChange} className="col-span-3"/>
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className='py-10'>
              <SheetClose asChild>
              <Button onClick={handleSubmitReminder} type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div> 
    </div>
  );
};

export default ShowContact;
