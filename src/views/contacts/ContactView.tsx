// ContactView.tsx
import * as React from "react"
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {createReminder, updateContact} from '@/controllers/crud';
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

import { addDays, format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Note } from "@/components/rel/note";
import { Reminder } from "@/components/rel/reminder";
import { CreateNoteButton } from "@/components/rel/create_note_button";

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
  Group: string;
}

interface Note {
  ID: number;
  ContactId: number;
  Date: string;
  Content: string;
  Title: string;
}

interface Reminder {
  ID: number;
  ContactId: number;
  Date: string;
  Todo: string;
  Status: string;
  Title: string;
}
import { useUser } from '@/UserContext';


const ContactView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isDeleteContact, setIsDeleteContact] = useState<number>(0);
  const [todo, setTodo] = useState("Todo...");
  const [reminderTitle, setReminderTitle] = useState("Reminder title");
  const [date, setDate] = React.useState<Date>();
  const [group, setGroup] = useState("all");

  const { user, setUser } = useUser();

  console.log(user);
  
  const handleTodoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const handleReminderTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReminderTitle(e.target.value);
  };

  const handleSubmitReminder = () => {
    const contactId = contact?.ID;
    createReminder(contactId, reminderTitle, todo, date);
    const now = new Date();
    const formattedDate = now.toISOString();
    toast({
      duration: 2500,
      title: "New reminder created",
      description: formattedDate,
    })
  };

  const handleDeleteNote = (deletedNoteId: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.ID !== deletedNoteId));
  };

  const handleDeleteReminder = (deletedReminderId:number|undefined) => {
    setReminders(prevReminders => prevReminders.filter(reminder => reminder.ID !== deletedReminderId));
  }

  const { toast } = useToast()

  const handleEdit = () => {
    updateContact(contact?.ID, group)
    console.log(group)
  }

  useEffect(() => {
    // Fetch contact details
    fetch(`https://localhost:3000/api/contact/${id}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => setContact(data.contact))
      .catch(error => console.error('Error fetching contact details:', error));

    // Fetch contact notes
    fetch(`https://localhost:3000/api/note/contact/${id}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => setNotes(data.notes))
      .catch(error => console.error('Error fetching contact notes:', error));

    // Fetch contact reminders
    fetch(`https://localhost:3000/api/reminder/contact/${id}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => setReminders(data.reminders))
      .catch(error => console.error('Error fetching contact reminder:', error));

      if(isDeleteContact){
        fetch(`https://localhost:3000/api/contact/${id}`, {
          method: 'DELETE',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            }
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
    <div className='gridgrid-cols-3 gap-2'>
      <div className="col-span-4">
        <Card key={contact?.ID} className='w-full'>
            <CardHeader>
              <CardTitle>
                @{`${contact?.Name}.${contact?.LastName}`.toLowerCase()}
              </CardTitle>
              <CardDescription>{contact?.Email}</CardDescription>
              <CardContent className='text-left'>
                <p>{contact?.Name}</p>
                <p>{contact?.LastName}</p>
                <p>{contact?.Phone}</p>
                <p>{contact?.LinkedIn}</p>
                <p>{contact?.Group}</p>
              </CardContent>
            </CardHeader>
            <Sheet>
            <SheetTrigger>
              <Button variant="outline">Edit</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="sm:max-h-[800px]">
              <SheetHeader>
                <SheetTitle>Edit</SheetTitle>
                <SheetDescription>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="group">
                        Group
                    </Label>
                    <Select onValueChange={(value) => setGroup(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="✨ All">✨ All</SelectItem>
                        <SelectItem value="🦄 Founder">🦄 Founder</SelectItem>
                        <SelectItem value="💻 Software Engineer">💻 Software Engineer</SelectItem>
                        <SelectItem value="🤓 Data Engineer">🤓 Data Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className='py-10'>
                <SheetClose asChild>
                <Button onClick={handleEdit} type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Card>
      </div>
      <div className="col-span-4 text-left">
        <div className='pb-2'>
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
        <div className='pb-2'>
          <CreateNoteButton contact_id={contact?.ID} />
        </div>
        <div className='pb-2'>
          <Sheet>
            <SheetTrigger>
              <Button variant="outline">Create Reminder</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="sm:max-h-[800px]">
              <SheetHeader>
                <SheetTitle>Create Reminder</SheetTitle>
                <SheetDescription>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="title">
                        Title
                    </Label>
                    <Input id="title" placeholder="Reminder title" onChange={handleReminderTitleChange} className="col-span-3"/>
                    <Label htmlFor="todo">
                      Todo
                    </Label>
                    <Textarea id="todo" placeholder="Type your message here." onChange={handleTodoChange} className="col-span-3"/>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                          {date ? format(date, "PPP") : <span>Date Reminder</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                      >
                        <Select
                          onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </div>
                      </PopoverContent>
                    </Popover>
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
      <div className="col-span-4 py-5">
        <div className='py-10'>
        <Separator />
        </div>
        <Tabs defaultValue="notes" className="text-left">
          <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>
          <TabsContent value="reminders">
          <Accordion type="single" collapsible>
        {reminders.map(reminder => (
          <AccordionItem value={reminder.ID.toString()}>
          <AccordionTrigger>{reminder.Title} - {formatDate(reminder.Date)}</AccordionTrigger>
          <AccordionContent>
            <Reminder reminder_id={reminder.ID} reminder_todo={reminder.Todo} onDeleteReminder={handleDeleteReminder} />
          </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
          </TabsContent>
          <TabsContent value="notes">
          <Accordion type="single" collapsible>
            {notes.map(note => (
              <AccordionItem value={note.ID.toString()}>
                <AccordionTrigger>{note.Title} - {formatDate(note.Date)}</AccordionTrigger>
                <AccordionContent>
                  <Note note_id={note.ID} note_content={note.Content} onDeleteNote={handleDeleteNote}/>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
          </TabsContent>
        </Tabs>
        <div className='text-left'>
        <Toaster />
        </div>
        
      </div>
    </div>
  );
};

export default ContactView;
