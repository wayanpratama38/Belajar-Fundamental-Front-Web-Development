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

const getArchivedNotes = async () => {
  return fetch(`${baseUrl}/notes/archived`)
  .then((response)=>{
    if(response.status === 200){
      return response.json();
    }else {
      return [];
    }
  })
  .then((responseJson)=>{
    return responseJson.data.length > 0 ? responseJson.data : [];
  })
  .catch((error)=>{
    console.log(error);
    return [];
  })
}

const getSingleNote = async (id) => {
  return await fetch(`${baseUrl}/notes/${id}`)
  .then((response)=>{
    if(response.status === 200){
      return response.json();
    }else {
      return [];
    }
  })
  .then((responseJson)=>{
    return responseJson.data;
  })
  .catch((error)=>{
    console.log(error);
  })
}


const insertNotes = async (note) => {
  const title = typeof note.title === "string" ? note.title : String(note.title);
  const body = typeof note.body === "string" ? note.body : String(note.body);

  await fetch(`${baseUrl}/notes`,{
    method : "POST",
    body : JSON.stringify({
      title : title,
      body : body,
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
      return data;
    })
  })
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    console.log(error)
  })
}


const archiveNotes = async (note) => {
  return await fetch(`${baseUrl}/notes/${note.id}/archive`,{
    method : "POST",
    headers : {
      "Content-Type": "application/json"
    }
  })
  .then(async (responseJson)=>{
    return responseJson.json().then(data=>{
      if(!responseJson.ok){
        throw new Error(data.message)
      }
      return data;
    })
  })
  .then(response=>{
    console.log(response);
    return response;
  })
  .catch(error=>{
    console.log(error);
  })
}

const unarchiveNotes = async (note) => {
  return await fetch(`${baseUrl}/notes/${note.id}/unarchive`,{
    method : "POST",
    headers : {
      "Content-Type": "application/json"
    }
  })
  .then(async (responseJson)=>{
    return responseJson.json().then(data=>{
      if(!responseJson.ok){
        throw new Error(data.message)
      }
      return data;
    })
  })
  .then(response=>{
    console.log(response);
    return response;
  })
  .catch(error=>{
    console.log(error);
  })
}

const deleteNotes = async (note) => {
  return await fetch(`${baseUrl}/notes/${note.id}`,{
    method : "DELETE"
  })
  .then(async (responseJson)=>{
    return responseJson.json().then(data=>{
      if(!responseJson.ok){
        throw new Error(data.message)
      }
      return data;
    })
  })
  .catch(error=>{
    console.log(error);
  })
}

export { 
  archiveNotes, 
  getAllNotes, 
  getArchivedNotes,
  insertNotes,
  unarchiveNotes,
  deleteNotes,
  getSingleNote
};