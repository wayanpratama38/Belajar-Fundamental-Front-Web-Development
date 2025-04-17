import { 
    archiveNotes, 
    unarchiveNotes, 
    deleteNotes, 
    getSingleNote } from "./data/data.js";


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

// Show loading state in the UI
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading...</p>
    `;
    document.body.appendChild(loadingOverlay);
}

// Hide loading state
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}


async function deleteNote(id){
    try{
        showLoading();
        const note = await getSingleNote(id);
        if (note) {
            const response = await deleteNotes(note);
            console.log("Delete Response : ",response);
            if (response.status === "success") {
                document.querySelector("note-render").render();
            }
        }
    } catch(error) {
        console.log(error);
    } finally {
        hideLoading();
    }
}

async function archiveNote(id){
    try{
        showLoading();
        const note = await getSingleNote(id);
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
    } finally {
        hideLoading();
    }
}

async function unarchiveNote(id){
    try{
        showLoading();
        const note = await getSingleNote(id);
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
    }finally {
        hideLoading();
    }
}

export { 
    generateRandomID, 
    generateCreatedTime, 
    deleteNote, 
    archiveNote, 
    unarchiveNote, 
    showLoading,
    hideLoading
} ;