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


export { generateRandomID, generateCreatedTime } ;