import { getAllNotes } from "./data/data.js";

const notesData = getAllNotes();

function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";     
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function generateRandomID(){
    let firstCode = "";
    let secondCode = "";
    for(let i=0;i<4;i++){
        firstCode+=generateRandomLetter();
        secondCode+=generateRandomLetter();
    }
    return `notes-${firstCode}-${secondCode}`;
}

function generateCreatedTime(){
    const date = new Date(Date.now());
    return date.toISOString();
}

function findNotesIndex(id){
    return notesData.findIndex(note=> note.id === id);
}

function deleteNote(id){
    const index = findNotesIndex(id);
    if(index !== -1){
        notesData.splice(index,1);
        document.querySelector("note-render").render();
    }
}

async function archiveNote(id){
    const note = await notesData[findNotesIndex(id)];
    if(note){
        note.archived = true;
        document.querySelector("note-render").render();
    }
}

async function unarchiveNote(id){
    const note = await notesData[findNotesIndex(id)];
    if(note){
        note.archived = false;
        document.querySelector("note-render").render();
    }
}

function customValidationHandler(event){
    event.target.setCustomValidation('');
    if(event.target.validity.valueMissing) {
        event.target.setCustomValidation("Wajib diisi!.");
        return;
    }
}

export { generateRandomID, generateCreatedTime, deleteNote, archiveNote, unarchiveNote, customValidationHandler } ;