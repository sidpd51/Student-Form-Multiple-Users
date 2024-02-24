let users = [];


const tbody = document.getElementById('tbody')
const tbodyModal = document.getElementById('tbody-modal')

tbody.addEventListener('click', function(event){

    let target = event.target;
    let tr = target.closest('tr')

    if(!tr) return;

    if(!tbody.contains(tr)) return;

    let th = tr.querySelector('th')
    let id = parseInt(th.innerHTML)
    // console.log(id)
    visitUser(id)
})

function visitUser(id){

    let viewUser = users.filter(user=> user.userId==id);
    viewUser= viewUser[0]
    // console.log(users)
    // console.log(viewUser)
    document.getElementById('fname').value=viewUser.fname;
    document.getElementById('lname').value=viewUser.lname;
    document.getElementById('dob').value=viewUser.dob;
    document.getElementById('email').value=viewUser.email;
    document.getElementById('address').value=viewUser.address;
    document.getElementById('graduation').value=viewUser.graduation;

}



function renderUsers(){
    // Your code to render something goes here
    let html =''
    
    users.forEach(user=>{

        html+=
        `<tr>
            <th scope="row">${user.userId}</th>
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.email}</td>
            <td>${user.dob}</td>
            <td>${user.graduation}</td>
            <td><button class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-eye fa-xl"></i></button></td>
            <td><button class="btn"><i class="fa-regular fa-trash-can fa-xl text-danger"></i></button></td>
        </tr>
        `
        tbody.innerHTML= html;
    })
}

renderUsers()

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

let createUserForm = document.querySelector('.create')

createUserForm.addEventListener('click', function(event){
    userId=addUser(userId)
})

function addUser(userId){
    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const dob = document.getElementById('dob').value
    const email = document.getElementById('email').value
    const address = document.getElementById('address').value
    const graduation = document.getElementById('graduation').value

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

    renderUsers()

    return userId;
}

function removeUser(userId){
    // modal bootstrap
    users = users.filter(user=> user.id!=userId)
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

