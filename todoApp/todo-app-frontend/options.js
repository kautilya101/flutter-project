const url = 'http://localhost:3500/v1/tasks/';



const makeRequest = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    loadAlltasks(data);
}


function loadAlltasks(data){

    let container = document.querySelector('.container');
   

    for(item of data){

        let updatebtn = document.createElement('button');
        updatebtn.className = 'update-btn';
        updatebtn.innerHTML = '<i class="fa fa-edit" style="font-size:30px;color:white"></i>';
        updatebtn.id = JSON.stringify(item);
        updatebtn.addEventListener('click',() => {
            openUpdateModal(updatebtn.id)
        })
        
        let deletebtn = document.createElement('button');
        deletebtn.className = 'delete-btn';
        deletebtn.innerHTML = '<i class="fa fa-trash" style="font-size:30px;color:white"></i>';
        deletebtn.id = item.id;
        deletebtn.addEventListener('click',() => {
            deleteCard(deletebtn.id);
        })

        let containerChild = document.createElement('div');
        containerChild.className = 'containerChild';
        let card = document.createElement('div');
        card.className = 'card';
        

        let childLeft = document.createElement('div');
        let  childRight = document.createElement('div');
        childLeft.className = 'childLeft';
        childRight.className = 'childRight';

        let taskname = document.createElement('h1');
        let status = document.createElement('h3');
        let duedate = document.createElement('h3');
        let desc = document.createElement('h4');

        taskname.innerHTML = item.taskName;
        status.innerHTML = item.status;
        duedate.innerHTML = item.dueDate;
        desc.innerHTML = item.taskDescription;

        childLeft.appendChild(taskname);
        childLeft.appendChild(desc);
        childRight.appendChild(duedate);
        childRight.appendChild(status);
        card.appendChild(childLeft);
        card.appendChild(childRight);
        containerChild.appendChild(updatebtn);
        containerChild.appendChild(card);
        containerChild.appendChild(deletebtn);
        container.prepend(containerChild);
    }

    

}


const deleteCard = async(id) => {
    console.log(id);
    let newurl = `${url}?` + `id=${id}`;
    await fetch(newurl, {method : 'DELETE'});
    
    // loadAlltasks(data);
}


const openModal = async () => {
    var modal = document.querySelector("#myModal");
    var btn = document.querySelector('.add-btn');
    var span = document.querySelector(".close");
    btn.onclick = function() {
      modal.style.display = "block";
    }
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    callForm("",'post')
}

function callForm(id="",method,item){
  let form = document.querySelector('.add-task');
  form.reset();
  if (method === 'put') {
    console.log(item.taskName);
    form.tName.value = item.taskName;
    form.desc.value = item.taskDescription;
    form.dDate.value = item.dueDate;
    form.status.value = item.status;
  }
  let submitForm = document.querySelector('.submitForm');
  submitForm.addEventListener('click', (e) => {
    getData(id,method,e,form);
  })
}

const openUpdateModal = async (id) => {
    var modal = document.querySelector("#myModal");
    var btn = document.querySelector('.update-btn');
    var span = document.querySelector(".close");
    btn.onclick = function() {
      modal.style.display = "block";
    }
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    id = JSON.parse(id);
    callForm(id.id,'put',id);
}




function getData(id,method,e,formType,){
    e.preventDefault();
    const formData = new FormData(formType);
    const tName = formData.get('tName');
    const desc = formData.get('desc');
    const dueDate = formData.get('dDate');
    const status = formData.get('status');
    postData(tName,desc,dueDate,status,id,method);
}


const postData = async(tName,desc,dueDate,status,id,method) => {
    await fetch(url,{
        method: `${method}`,
        headers:{"Content-Type":"application/json","Accepted":"application/json"},
        body:JSON.stringify(makeObject(tName,desc,dueDate,status,id))
    });
}


function makeObject(tName,desc,dueDate,status,id){
  return { 
  "id":id,
  "taskName":tName,
  "taskDesc":desc,
  "dueDate":dueDate,
  "status":status
}
}

makeRequest(url);