import { useEffect, useState } from 'react';
import {deleteReminder} from '@/controllers/crud';
import Markdown from 'react-markdown'
import { Button } from "@/components/ui/button"
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

interface ReminderProps {
    reminder_id: number;
    reminder_todo: string;
  }
const Reminder: React.FC<ReminderProps & { onDeleteReminder: (reminder_id: number) => void }> = ({ reminder_id, reminder_todo, onDeleteReminder }) => {
    const [isDeleteReminder, setisDeleteReminder] = useState<number>(0);

    const handleDeleteReminder = () => {
        deleteReminder(reminder_id);
        setisDeleteReminder(1);
        onDeleteReminder(reminder_id);
    };

    useEffect(() => {
        if (isDeleteReminder) {
        setisDeleteReminder(0);
        }
    }, [isDeleteReminder]);
    
    return (
        <div className='grid gap-2 lg:grid-cols-8 sm:grid-cols-1 mt-6'>
            <div className='text-left lg:border p-8 lg:border-gray-300 rounded lg:col-span-6 sm:col-span-8'>  
            <Markdown className="markdown-render">{ reminder_todo }</Markdown>
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
                <AlertDialogAction onClick={() => handleDeleteReminder()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
            </div>
        </div>
    )
}

export { Reminder };