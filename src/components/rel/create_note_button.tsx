import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
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

import { useToast } from "@/components/ui/use-toast"
import { createNote } from '@/controllers/crud';


interface CreateNoteButtonProps {
    contact_id: number | undefined
}



const CreateNoteButton: React.FC<CreateNoteButtonProps> = ({ contact_id }) => {
    const [title, setTitle] = useState('Note title');
    const [content, setContent] = useState('Note...');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };
    
    const { toast } = useToast();

    const handleSubmitNote = () => {
        createNote(contact_id, title, content);
        const now = new Date();
        const formattedDate = now.toISOString();
        toast({
            duration: 2500,
            title: "New note created",
            description: formattedDate,
        });
      };

    return(
    <Sheet>
        <SheetTrigger>
            <Button variant="outline">Create Note</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="sm:max-h-[800px]">
            <SheetHeader>
            <SheetTitle>Create Note</SheetTitle>
            <SheetDescription>
                <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="title">
                    Title
                </Label>
                <Input id="title" placeholder="Note title" onChange={handleTitleChange} className="col-span-3"/>
                <Label htmlFor="content">
                    Content
                </Label>
                <Textarea id="content" placeholder="Type your message here." onChange={handleContentChange} className="col-span-3"/>
                
                </div>
            </SheetDescription>
            </SheetHeader>
            <SheetFooter className='py-10'>
            <SheetClose asChild>
            <Button onClick={handleSubmitNote} type="submit">Save changes</Button>
            </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
    )
}

export {CreateNoteButton};
