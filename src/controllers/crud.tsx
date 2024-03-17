
const deleteNote = async (noteId:number|undefined) => {
    fetch(`https://localhost:3000/api/note/${noteId}`, {
          method: 'DELETE',
        })
          .then(() => {
            console.log('Note deleted successfully!');
            // Optionally, you can update the state or perform any other actions after successful deletion.
          })
          .catch(error => console.error('Error deleting contact:', error));
};

const deleteReminder = async (reminderId:number|undefined) => {
  fetch(`https://localhost:3000/api/reminder/${reminderId}`, {
        method: 'DELETE',
      })
        .then(() => {
          console.log('Reminder deleted successfully!');
          // Optionally, you can update the state or perform any other actions after successful deletion.
        })
        .catch(error => console.error('Error deleting contact:', error));
};

const createNote = async (contactId:number|undefined, title: string, content: string) => {
  try {
    const response = await fetch(`https://localhost:3000/api/note/contact/${contactId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Content: content,
        Title: title
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

const updateNote = async (note_id: number, content: string) => {
  try {
    const response = await fetch(`https://localhost:3000/api/note/${note_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Content: content
      }),
    });

    if (response.ok) {
      console.log('Note updated successfully!');
      // Optionally, you can perform additional actions after successful creation.
    } else {
      console.error('Error creating note:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating note:', error);
  }
};

const createReminder = async (contactId:number|undefined, title: string, todo: string, date: Date|undefined) => {
  const formattedDate = date?.toISOString();
  try {
    const response = await fetch(`https://localhost:3000/api/reminder/contact/${contactId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Todo: todo,
        Date: formattedDate,
        Title: title
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



const updateContact = async (contactId:number|undefined, group: string) => {
  try {
    const response = await fetch(`https://localhost:3000/api/contact/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Group: group
      }),
    });

    if (response.ok) {
      console.log('Contact updated successfully!');
      // Optionally, you can perform additional actions after successful creation.
    } else {
      console.error('Error creating note:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating note:', error);
  }
};

export {createNote, createReminder, deleteNote, deleteReminder, updateNote, updateContact}