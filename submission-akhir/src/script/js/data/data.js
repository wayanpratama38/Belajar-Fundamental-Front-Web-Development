const baseUrl = "https://notes-api.dicoding.dev/v2"

const getAllNotes = async () => {
  return fetch(`${baseUrl}/notes`)
  .then((response) => {
    if(response.status === 200){
      return response.json();
    }else {
      return [];
    }
  })
  .then((responseJson) => {
    return responseJson.data.length > 0 ? responseJson.data : [];
  })
  .catch((error) => {
    console.log(error);
    return [];
  })
}

const notesData = getAllNotes();

const filteredArchivedNotes = async () => {
  const notes = await getAllNotes();
  return notes
  .filter((note)=>{
    return note.archived===true;
  })
  .map(note=>{
    return note;
  });
}

const filteredActiveNotes = async () => {
  const notes = await getAllNotes();
  return notes
  .filter((note) => {
    // console.log(note.archived?"true" : "false",note.title);
    return note.archived===false;
  })
  .map(note => {
    return note;
  });
}

const insertNotes = (notes) => {
  fetch(`${baseUrl}/notes`,{
    method : "POST",
    body : {
      title : String,
      body : String,
    }
  })
  .then((response)=>{
    return response.json();
  })
  .then((responseJson)=>{
    if(responseJson.error){
      console.log(responseJson.message);
    } 
    getAllNotes();
  })
  .catch((error)=>{
    console.log(error)
  })
}

export { notesData, filteredActiveNotes, filteredArchivedNotes };