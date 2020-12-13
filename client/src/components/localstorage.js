setData = () => {
    //set data with localstorage
let obj =  {name: "Tunde", age: 34, email: "contactleomax@gmail.com"} 
localStorage.setItem('myData', JSON.stringify(obj));
}

getData = () => {
    let data = localStorage.getItem('myData');
    data = JSON.parse(data);
    console.log(data);
}

setSessionData = () => {
    //set data with sessionstorage
let obj =  {name: "Esther", age: 34, email: "estheralao@gmail.com"} 
sessionStorage.setItem('mySessionData', JSON.stringify(obj));
}

getSessionData = () => {
    let data = sessionStorage.getItem('mySessionData');
    data = JSON.parse(data);
    console.log(data);
}