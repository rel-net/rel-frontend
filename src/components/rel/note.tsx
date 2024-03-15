import { useEffect, useState } from 'react';
import {deleteNote, updateNote} from '@/controllers/crud';
import Markdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
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
    const [isEditNote, setIsEditNote] = useState<number>(0);
    const [editedContent, setEditedContent] = useState(note_content);

    const handleDeleteNote = () => {
        deleteNote(note_id);
        setIsDeleteNote(1);
        onDeleteNote(note_id);
    };

    const handleEditNote = () => {
      console.log(editedContent);
      updateNote(note_id, editedContent);
      setIsEditNote(0);
    }
    

    useEffect(() => {
      if (isDeleteNote === 1) {
        // Note deleted, reset state
        setIsDeleteNote(0);
      }
      if (isEditNote === 2){
        handleEditNote()
      }
      
  }, [isDeleteNote, isEditNote]);
    
    return (
        <div className='grid gap-2 lg:grid-cols-8 sm:grid-cols-1 mt-6'>
              <div className='text-left lg:border p-8 lg:border-gray-300 rounded lg:col-span-6 sm:col-span-8'>
              {isEditNote === 1 ? (
                <Textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
              ) : (
                <Markdown className="markdown-render">{ note_content }</Markdown>
              )}
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
                    <AlertDialogAction onClick={() => handleDeleteNote()}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button variant="default" onClick={() => setIsEditNote(1)}>Edit Note</Button>
              <Button variant="default" onClick={() => setIsEditNote(2)}>Save</Button>
              </div>
            </div>
    )
}

export { Note };