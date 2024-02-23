let users= [];

// let users = [
//     {
//         id: 1,
//         commonInfo: {
//             firstName: "Sid",
//             lastName: "PD",
//             email: "sidpd@example.com",
//             dob: "1990-01-01",
//             graduation: {
//                 degree: "Bachelor's",
//                 major: "Computer Science",
//                 year: 2020
//             }
//         }
//     },
// ];
let userId = 1;

function createUser(){
    let newUser
    users.push(newUser);
}

createUser

function deleteUser(idToRemove){
    users = users.filter(user=>user.id!=idToRemove);
}

function readAll(users){
    console.log(JSON.stringify(users))
}

function read(idToRead){
    const user = users.filter(user=> user.id=idToRead)
    console.log(user)
}