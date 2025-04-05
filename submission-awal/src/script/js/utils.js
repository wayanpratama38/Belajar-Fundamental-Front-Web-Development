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

function archiveNote(id){
    const note = notesData[findNotesIndex(id)];
    if(note){
        note.archived = true;
        document.querySelector("note-render").render();
    }
}

function unarchiveNote(id){
    const note = notesData[findNotesIndex(id)];
    if(note){
        note.archived = false;
        document.querySelector("note-render").render();
    }
}

export { generateRandomID, generateCreatedTime, deleteNote, archiveNote, unarchiveNote } ;