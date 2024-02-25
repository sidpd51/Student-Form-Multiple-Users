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
            <td><button class="btn delete-icon"><i class="fa-regular fa-trash-can fa-xl text-danger"></i></button></td>
        </tr>
        `
    })
    tbody.innerHTML= html;
}

// read and delete 

tbody.addEventListener('click', function(event){

    const target = event.target;
    console.log(target)
    const tr = target.closest('tr')

    if(!tr) return;

    if(!tbody.contains(tr)) return;

    const th = tr.querySelector('th')
    const id = parseInt(th.innerHTML)
    // console.log(id)
    // console.log(users)
    
    if(target.closest('BUTTON').classList.contains('delete-icon')){
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


// logic calculations create and update

let toggleUpdate = document.querySelector('.toggle-update')
let createForm = document.getElementById('create-form')

createForm.addEventListener('click', function(event){
    isUpdating=false

    // let updateToggle = document.getElementById('dualActionBtn')
    // updateToggle.removeAttribute('data-bs-dismiss')

    if(!isUpdating){
        document.getElementById('dualActionBtn').innerHTML= "Create";
    }
    // for clearing inputs whenever we are creating a new form 
    clearInputs()
})

toggleUpdate.addEventListener('click', function(event){
    console.log(event.target)
    if(validateForm()){

        

        console.log(event.target)
        if(isUpdating){
            console.log('on update function');
            updateUser(currentId);
        }else{
            console.log('on add function');
            userId=addUser(userId);
        }
        let modal = document.getElementById('staticBackdrop'); 
        let closeButton = modal.querySelector('[data-bs-dismiss="modal"]')
        closeButton.click()  
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

        const educationRows = tbodyModal.querySelectorAll('tr')
        const updatedEducation =[]

        educationRows.forEach(row =>{
            const degree = row.querySelector('.degreeInput').value;
            const college = row.querySelector('.collegeInput').value;
            const startDate = row.querySelector('.startDateInput').value;
            const passoutYear = row.querySelector('.passoutYearInput').value;
            const percentage = row.querySelector('.PercentageInput').value;
            const backlog = row.querySelector('.backlogInput').value;

            const educationObj = {
                degree,
                college,
                startDate,
                passoutYear,
                percentage,
                backlog
            }

            updatedEducation.push(educationObj)
        })
        users[index].education = updatedEducation;
        alert('form updated successfully!')
    }
}

function clearInputs(){
    console.log('clear inputs called')
    const inputFields = document.querySelectorAll('.my-inputs');
    inputFields.forEach(inputField=>{
        // console.log(inputField)
        inputField.value= ""
    })
}

function addUser(userId){

    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const dob = document.getElementById('dob').value
    const email = document.getElementById('email').value
    const address = document.getElementById('address').value
    const graduation = document.getElementById('graduation').value

    const education = []
    const educationRows= tbodyModal.querySelectorAll('tr')


    educationRows.forEach( row => {
        const degree = row.querySelector('.degreeInput').value;
        const college = row.querySelector('.collegeInput').value;
        const startDate = row.querySelector('.startDateInput').value;
        const passoutYear = row.querySelector('.passoutYearInput').value;
        const percentage = row.querySelector('.PercentageInput').value;
        const backlog = row.querySelector('.backlogInput').value;

        const educationObj = {
            degree,
            college,
            startDate,
            passoutYear,
            percentage,
            backlog
        };
        
        education.push(educationObj);
    })

    const user = {
        userId,
        fname,
        lname,
        dob,
        email,
        address,
        graduation, 
        education
    }

    users.push(user);
    alert('form created successfully!')
    userId++;
    return userId;
}

// form education 

const plusBtn = document.querySelector('.plus-btn')
const minusBtn = document.querySelector('.minus-btn')

plusBtn.addEventListener('click', function (){
    let newField = document.createElement('tr')
    newField.innerHTML=`
        <td class="pb-0 pt-3">
            <input type="text" id="degree" name="degree" value="" class="degreeInput w-100 my-inputs"><br>
            <span id="degreeError" class="error d-inline-block text-danger "></span>
        </td>
        <td class="pb-0 pt-3">
            <input type="text" id="college" name="college" value="" class="collegeInput w-100 my-inputs"><br>
            <span id="collegeError" class="error d-inline-block text-danger "></span>
        </td>
        <td class="pb-0 pt-3">
            <input type="month" id="startDate" name="startDate" value="" class="startDateInput w-100 my-inputs"><br>
            <span id="startDateError" class="error d-inline-block text-danger "></span>
        </td>
        <td class="pb-0 pt-3">
            <input type="month" id="passoutYear" name="passoutYear" value="" class="passoutYearInput w-100 my-inputs"><br>
            <span id="passoutYearError" class="error d-inline-block text-danger "></span>
        </td>
        <td class="pb-0 pt-3">
            <input type="number" id="Percentage" name="Percentage" value="" class="PercentageInput w-100 my-inputs" min="0" max="100" placeholder="Don't use % sign" step="0.01"><br>
            <span id="PercentageError" class="error d-inline-block text-danger "></span>
        </td>
        <td class="pb-0 pt-3">
            <input type="number" id="backlog" name="backlog" value="0" class="backlogInput w-100 my-inputs" min="0" placeholder="If Any"><br>
            <span id="backlogError" class="error d-inline-block text-danger "></span>
        </td>
        <td class="text-center pt-3"><i class="minus-btn fa-regular fa-square-minus fa-xl"></i></i></td>
     `
    tbodyModal.appendChild(newField);
})

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('minus-btn')) {
        const row = event.target.closest('tr');
        // console.log(row);
        row.parentNode.removeChild(row);

        // You may want to update other things after removing the row
        updateUser();
    }
});

renderUsers()

function validateForm(){
    console.log("inside validate")
    const fname = document.getElementById('fname').value
    const dob = document.getElementById('dob').value
    const email = document.getElementById('email').value
    const address = document.getElementById('address').value
    const graduation = document.getElementById('graduation').value

    let isValid = true;
    const dobFormat = new Date(dob);
    const gradYear = parseInt(graduation.slice(0,4))
    const current = new Date();
    const dobYear = dobFormat.getFullYear();
    const currentYear = current.getFullYear();
    const yearDiff = currentYear-dobYear;
    const gradDiff = currentYear-gradYear;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('fnameError').innerHTML=""
    document.getElementById('dobError').innerHTML=""
    document.getElementById('emailError').innerHTML=""
    document.getElementById('addressError').innerHTML=""
    document.getElementById('graduationError').innerHTML=""

    console.log(graduation)

    if(fname.trim()==''){
        document.getElementById('fnameError').innerHTML="First name can't be empty!";
        isValid=false;
    }

    if(dob=='' ||  yearDiff<18){
        document.getElementById('dobError').innerHTML="Min age should be 18!";
        isValid=false;
    }

    if(email.trim()==''){
        document.getElementById('emailError').innerHTML="Email can't be empty!";
        isValid=false;
    }else if(!emailRegex.test(email)){
        document.getElementById('emailError').innerHTML="Email format is wrong!";
        isValid=false;
    }

    if(address.trim()==''){
        document.getElementById('addressError').innerHTML="Address can't be empty!";
        isValid=false;
    }
    
    // console.log(gradDiff)
    // document.getElementById('graduationError').innerHTML="Graduation Year must be before current Year!";
        
    if(graduation==''){
        document.getElementById('graduationError').innerHTML="Graduation Year must be before current Year!";
        isValid=false;
    }else if(gradDiff<0){
        document.getElementById('graduationError').innerHTML="Graduation Year must be before current Year!";
        isValid=false;
    }

    return isValid
}

function closeModal() {
    // Close the modal programmatically
    let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.hide();
}