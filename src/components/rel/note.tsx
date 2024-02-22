import { useEffect, useState } from 'react';
import {deleteNote} from '@/controllers/crud';
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

interface NoteProps {
    note_id: number;
    note_content: string;
  }
const Note: React.FC<NoteProps & { onDeleteNote: (note_id: number) => void }> = ({ note_id, note_content, onDeleteNote }) => {
    const [isDeleteNote, setIsDeleteNote] = useState<number>(0);

    const handleDeleteNote = () => {
        deleteNote(note_id);
        setIsDeleteNote(1);
        onDeleteNote(note_id);
    };

    useEffect(() => {
        if (isDeleteNote) {
        setIsDeleteNote(0);
        }
    }, [isDeleteNote]);
    
    return (
        <div className='grid gap-2 lg:grid-cols-8 sm:grid-cols-1 mt-6'>
              <div className='text-left lg:border p-8 lg:border-gray-300 rounded lg:col-span-6 sm:col-span-8'>
              
              <Markdown className="markdown-render">{ note_content }</Markdown>
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
                    <AlertDialogAction onClick={() => handleDeleteNote(note_id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </div>
            </div>
    )
}

export { Note };