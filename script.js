let users = [];
let isUpdating = false;
let userId=1;
let currentId;

const tbody = document.getElementById('tbody')
const tbodyModal = document.getElementById('tbody-modal')



function renderUsers(){
    // Your code to render something goes here
    let html ='';

    if(users.length==0){
        tbody.innerHTML=html;
        return; // Exit the function if users array is empty
    }

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
            <td><button class="btn"><i class="fa-regular fa-trash-can fa-xl text-danger delete-icon"></i></button></td>
        </tr>
        `
    })
    tbody.innerHTML= html;
}

tbody.addEventListener('click', function(event){

    let target = event.target;
    console.log(target)
    let tr = target.closest('tr')

    if(!tr) return;

    if(!tbody.contains(tr)) return;

    let th = tr.querySelector('th')
    let id = parseInt(th.innerHTML)
    // console.log(id)
    console.log(users)

    if(target.classList.contains('delete-icon')){
        console.log('inside delete')
        removeUser(id)
        console.log(users)
    }else {
        currentId=visitUser(id)
        console.log('inside view')
    }
})

function visitUser(id){
    isUpdating=true
    let viewUser = users.find(user=> user.userId==id);
    // viewUser= viewUser[0]
    // console.log(users)
    // console.log(viewUser)
    
    if(isUpdating){
        document.getElementById('dualActionBtn').innerHTML= "Update";
    }

    document.getElementById('fname').value=viewUser.fname;
    document.getElementById('lname').value=viewUser.lname;
    document.getElementById('dob').value=viewUser.dob;
    document.getElementById('email').value=viewUser.email;
    document.getElementById('address').value=viewUser.address;
    document.getElementById('graduation').value=viewUser.graduation;

    return id;
}

function removeUser(id){

    console.log(users)
    let currentUser = users.find(user => user.userId==id)

    let flag = confirm(`Are you sure you want to delete ${currentUser.fname} data?`)

    if(flag){
        users = users.filter(user=> user.userId!=id);
        console.log(users)
        renderUsers();
    }
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
        updateUser();
    }
});


// logic calculations 

let toggleUpdate = document.querySelector('.toggle-update')
let createForm = document.getElementById('create-form')

createForm.addEventListener('click', function(event){
    isUpdating=false
    if(!isUpdating){
        document.getElementById('dualActionBtn').innerHTML= "Create";
    }
})

toggleUpdate.addEventListener('click', function(event){
    if(isUpdating){
        console.log('on update function')
        updateUser(currentId)
    }else{
        userId=addUser(userId)
        console.log('on add function')
    }
    renderUsers()
})

function updateUser(id){
    console.log('inside update fun')
    const updatedFname = document.getElementById('fname').value;
    const updatedLname = document.getElementById('lname').value;
    const updatedDob = document.getElementById('dob').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedAddress = document.getElementById('address').value;
    const updatedGraduation = document.getElementById('graduation').value;

    const index = users.findIndex(user=> user.userId == id);
    if(index!== -1){
        users[index].fname= updatedFname;
        users[index].lname= updatedLname;
        users[index].dob= updatedDob;
        users[index].email= updatedEmail;
        users[index].address= updatedAddress;
        users[index].graduation= updatedGraduation;
    }
}

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
    return userId;
}








renderUsers()