import { generateCreatedTime, generateRandomID, deleteNote, archiveNote, unarchiveNote, customValidationHandler } from "./utils.js";

class AppBar extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`
        <h1>Notes App</h1>
        `;
    }
}
class NoteForm extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <form id=note-form>
                <input type="text" id="title" placeholder="Title" required>
                <textarea 
                    id="message" 
                    placeholder="Message" 
                    required
                ></textarea>
                <div id="checkboxWrapper">
                    <input type="checkbox" id="check" checked>
                    <label for="check">Archive this note?</label>
                </div>
                <button type="submit" id="add" disabled=true>Add Notes</button>
            </form>
        `;

        const form = this.querySelector("#note-form");
        const title = this.querySelector("#title");
        const message = this.querySelector("#message");
        const addNoteButton = this.querySelector("#add");

        form.addEventListener("input",()=>{
            addNoteButton.disabled = !(title.value && message.value);
        });

        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            const isArchive = this.querySelector("#check").checked;
            const newNotes ={
                id : generateRandomID(),
                title : title.value,
                body : message.value,
                createdAt : generateCreatedTime(),
                archived : isArchive
            }
            notesData.push(newNotes);
            document.querySelector("note-render").render();
        });

    }
}


class ArchivedNoteItem extends HTMLElement{
    static get observedAttributes() {
        return ['title','message','note-id'];
    }

    constructor(){
        super();
        this.handleUnarchived = this.handleUnarchived.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    connectedCallback(){
        this.render();        
        this.querySelector("#deleteButton").addEventListener("click",this.handleDelete);
        this.querySelector("#unarchiveButton").addEventListener("click",this.handleUnarchived);
    }

    handleUnarchived(){
        const notesId = this.getAttribute("note-id");
        unarchiveNote(notesId);
    }

    handleDelete(){
        const notesId = this.getAttribute("note-id");
        deleteNote(notesId);
    }

    attributeChangedCallback(oldValue, newValue) {
        if (oldValue !== newValue) {
          this.render();
        }
    }

    render(){
        this.innerHTML = `
        <h2>${this.getAttribute("title")}</h2>
        <p class="noteMessage">${this.getAttribute("message")}</p>
        <div class="actionButton">
            <button id="unarchiveButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="m10.2 7l-4-4H21v4zM20 8h-8.8l8.8 8.8zm0 11.35v-.01L8.66 8l-1-1l-5.27-5.27L1.11 3L3 4.89V7h2.11l1 1H4v13h15.11l1.73 1.73l1.27-1.27z"/></svg>
                <span>
                    <div>Unarchive</div>
                </span>
            </button>
            <button id="deleteButton" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"/></g></svg>
                <span>
                    <div>Delete</div>
                </span>
            </button>
        </div>
        `;
    }
}

class ActiveNoteItem extends HTMLElement{
    static get observedAttributes() {
        return ['title','message','note-id'];
    }

    constructor() {
        super();
        this.handleArchive = this.handleArchive.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleArchive(){
        const noteId = this.getAttribute("note-id");
        archiveNote(noteId)
    }

    handleDelete(){
        const noteId = this.getAttribute("note-id");
        deleteNote(noteId);
    }
    
    connectedCallback(){
        this.render();
        this.querySelector("#deleteButton").addEventListener("click",this.handleDelete);
        this.querySelector("#archiveButton").addEventListener("click",this.handleArchive);
    }

    attributeChangedCallback(oldValue, newValue) {
        if (oldValue !== newValue) {
          this.render();
        }
    }
    

    render(){
        this.innerHTML = `
        <h2>${this.getAttribute("title")}</h2>
        <p class="noteMessage">${this.getAttribute("message")}</p>
        <div class="actionButton">
            <button id="archiveButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M2 5c0-.943 0-1.414.293-1.707S3.057 3 4 3h16c.943 0 1.414 0 1.707.293S22 4.057 22 5s0 1.414-.293 1.707S20.943 7 20 7H4c-.943 0-1.414 0-1.707-.293S2 5.943 2 5"/><path fill="#fff" fill-rule="evenodd" d="m20.069 8.5l.431-.002V13c0 3.771 0 5.657-1.172 6.828S16.271 21 12.5 21h-1c-3.771 0-5.657 0-6.828-1.172S3.5 16.771 3.5 13V8.498l.431.002zM9 12c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.541c.184-.076.417-.076.883-.076h3c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883s0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077h-3c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C9 12.699 9 12.466 9 12" clip-rule="evenodd"/></svg>    
                <span>
                    <div>Archive</div>
                </span>
            </button>
            <button id="deleteButton" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"/></g></svg>
                <span>
                    <div>Delete</div>
                </span>
            </button>
        </div>
        `;
    }
}

class NoteRender extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    render(){
        const archivedNotes = notesData.filter(note=> note.archived)
        const activeNotes = notesData.filter(note=>!note.archived)

        this.innerHTML =
        `
        <div class="titleWrapper">
            <h1>Active Notes</h1>
        </div>
        <div class="noteList">
            ${activeNotes.map(
                (note)=>
                    `<active-note-item note-id="${note.id}" title="${note.title}" message="${note.body}" class="noteListItem"></active-note-item>`
            ).join("")}
        </div>
        
        <div class="titleWrapper">
            <h1>Archived Notes</h1>
        </div>
        <div class="noteList">
            ${archivedNotes.map(
                (note)=>
                    `<archived-note-item note-id="${note.id}" title="${note.title}" message="${note.body}" class="noteListItem"></archived-note-item>`
            ).join("")}
        </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    customElements.define("app-bar",AppBar)
    customElements.define("note-form",NoteForm);
    customElements.define("archived-note-item",ArchivedNoteItem);
    customElements.define("active-note-item",ActiveNoteItem);
    customElements.define("note-render",NoteRender);
});
