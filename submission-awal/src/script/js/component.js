import { generateCreatedTime, generateRandomID } from "./utils.js";

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
                <button type="submit" id="add" disabled=true>Add Button</button>
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

            const newNotes ={
                id : generateRandomID(),
                title : title.value,
                body : message.value,
                createdAt : generateCreatedTime(),
                archived : false
            }
            notesData.push(newNotes);
        });

    }
}


class NoteArchived extends HTMLElement{
    connectedCallback(){

    }
}

document.addEventListener("DOMContentLoaded",(event)=>{
    customElements.define("note-form",NoteForm);

});
