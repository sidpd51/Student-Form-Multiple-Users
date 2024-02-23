let users = [
    {
        id:1,
        commonInfo: {
            firstName: "sid",
            lastName: "pd",
            email: "sidpd",
            dob: "apple",
            graduation: 'dfadsf'
        }
    }
];


const tbody = document.getElementById('tbody')
const tbodyModal = document.getElementById('tbody-modal')

// window.onload = function() {
//     // Your code to render something goes here
//     let html =''
    
//     users.forEach(user=>{

//         let commonInfo = user.commonInfo;

//         html+=
//         `<th scope="row">${user.id}</th>
//         <td>${commonInfo.firstName}</td>
//         <td>${commonInfo.lastName}</td>
//         <td>${commonInfo.email}</td>
//         <td>${commonInfo.dob}</td>
//         <td>${commonInfo.graduation}</td>
//         <td><button class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-eye fa-xl"></i></button></td>
//         <td><button class="btn"><i class="fa-regular fa-trash-can fa-xl text-danger"></i></button></td>
//         `
//         tbody.innerHTML= html;
//     })
// };

renderUsers()

function renderUsers(){
    // Your code to render something goes here
    let html =''
    
    users.forEach(user=>{

        let commonInfo = user.commonInfo;

        html+=
        `<th scope="row">${user.id}</th>
        <td>${commonInfo.firstName}</td>
        <td>${commonInfo.lastName}</td>
        <td>${commonInfo.email}</td>
        <td>${commonInfo.dob}</td>
        <td>${commonInfo.graduation}</td>
        <td><button class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-eye fa-xl"></i></button></td>
        <td><button class="btn"><i class="fa-regular fa-trash-can fa-xl text-danger"></i></button></td>
        `
        tbody.innerHTML= html;
    })
}

const plusBtn = document.querySelector('.plus-btn')
const minusBtn = document.querySelector('.minus-btn')

plusBtn.addEventListener('click', function (){
    let newField = document.createElement('tr')
    newField.innerHTML=`
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <th scope="row">1</th>
        <td>Mark</td>
        <td class="text-center"><i class="minus-btn fa-regular fa-square-minus fa-xl"></i></i></td>
     `
    tbodyModal.appendChild(newField);
    updateUsers()

})

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('minus-btn')) {
        const row = event.target.closest('tr');
        console.log(row);
        row.parentNode.removeChild(row);

        // You may want to update other things after removing the row
        updateUsers();
    }
});


// logic calculations 

let userId=1;

function addUser(userId){
    const fname = document.getElementById('fname')
    const lname = document.getElementById('lname')
    const dob = document.getElementById('dob')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const graduation = document.getElementById('graduation-year')


    const user = {
        userId,
        fname,
        lname,
        dob,
        email,
        address,
        graduation
    }

    users.push(user);
    userId++;
}

function removeUser(userId){
    // modal bootstrap
    users = users.filter(user=> user.id!=userId)
}

function readUser(userId){

    const viewUser = users.filter(user=> user.id==userId);
    document.getElementById('fname').innerHTML=viewUser.fname;
    document.getElementById('lname').innerHTML=viewUser.lname;
    document.getElementById('dob').innerHTML=viewUser.dob;
    document.getElementById('email').innerHTML=viewUser.email;
    document.getElementById('address').innerHTML=viewUser.address;
    document.getElementById('graduation').innerHTML=viewUser.graduation;

    console.log(viewToUser)
}

function updateUser(userId){
    const updatedFname = document.getElementById('fname');
    const updatedLname = document.getElementById('lname');
    const updatedDob = document.getElementById('dob');
    const updatedEmail = document.getElementById('email');
    const updatedAddress = document.getElementById('address');
    const updatedGraduation = document.getElementById('graduation');

    const userToUpdate = users.filter(user=> user.id== userId);
    userToUpdate.fname= updatedFname;
    userToUpdate.lname= updatedLname;
    userToUpdate.dob= updatedDob;
    userToUpdate.email= updatedEmail;
    userToUpdate.address= updatedAddress;
    userToUpdate.graduation= updatedGraduation;
}

