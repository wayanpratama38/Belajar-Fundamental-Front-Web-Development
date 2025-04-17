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

const insertNotes = async (note) => {
  await fetch(`${baseUrl}/notes`,{
    method : "POST",
    body : JSON.stringify({
      title : note.title,
      body : note.body,
    }),
    headers : {
      'Content-type' : 'application/json'
    }
  })
  .then(async (response)=>{
    return response.json().then(data=>{
      if(!response.ok){
        throw new Error(data.message)
      }
      return data
    })
  })
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    console.log(error)
  })
}

export { getAllNotes, insertNotes, filteredActiveNotes, filteredArchivedNotes };