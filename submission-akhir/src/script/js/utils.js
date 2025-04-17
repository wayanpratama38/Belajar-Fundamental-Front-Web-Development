import { getAllNotes, archiveNotes, unarchiveNotes, deleteNotes } from "./data/data.js";

async function init() {
    notesData = await getAllNotes();
    console.log("Notes Data Berhasil diambil")
}

let notesData = [];
init();

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

async function deleteNote(id){
    try{
        const index = findNotesIndex(id);
        const note = await notesData[index];
        if (note) {
            const response = await deleteNotes(note);
            console.log("Delete Response : ",response);
            if (response.status === "success") {
              notesData.splice(index,1);
                document.querySelector("note-render").render();

            }
        }
    } catch(error) {
        console.log(error);
    }
}

async function archiveNote(id){
    try{
        const note = await notesData[findNotesIndex(id)];
        if(note){
            note.archived = true;
            const response =  await archiveNotes(note);
            if (response.status === "success") {
                console.log(`Note dengan ID ${id} berhasil diarsipkan!`);
            } else {
                console.error(`Gagal mengarsipkan note dengan ID ${id}`);
            }
        }
        document.querySelector("note-render").render();
    } catch(error) {
        console.log(error);
    }
}

async function unarchiveNote(id){
    try{
        const note = await notesData[findNotesIndex(id)];
        if(note){
            note.archived = false;
            const response =  await unarchiveNotes(note);
            if (response.status === "success") {
                console.log(`Note dengan ID ${id} berhasil dibatalkan!`);
            } else {
                console.error(`Gagal mengarsipkan note dengan ID ${id}`);
            }
        }
        document.querySelector("note-render").render();
    }catch(error){
        console.log(error);
    }
}

function customValidationHandler(event){
    event.target.setCustomValidation('');
    if(event.target.validity.valueMissing) {
        event.target.setCustomValidation("Wajib diisi!.");
        return;
    }
}

export { 
    generateRandomID, 
    generateCreatedTime, 
    deleteNote, 
    archiveNote, 
    unarchiveNote, 
    customValidationHandler 
} ;