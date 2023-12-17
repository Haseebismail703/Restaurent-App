const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})



// Add todo 




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore ,collection, addDoc , onSnapshot , doc, deleteDoc ,updateDoc, } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";




// add data                           collection, addDoc
 // add data mai hai dlete data       doc, deleteDoc 
let firebaseConfig = {
	apiKey: "AIzaSyD52tNswEOG9bq-xqYotmQK3vRwa2rtm2Q",
	authDomain: "restaurent-app-dc0dd.firebaseapp.com",
	projectId: "restaurent-app-dc0dd",
	storageBucket: "restaurent-app-dc0dd.appspot.com",
	messagingSenderId: "486216927034",
	appId: "1:486216927034:web:3f66472dcda9f897737203",
	measurementId: "G-0L52VFQ7ZS"
};







let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let ids = []


let getinp = document.querySelector('#getinp')


	



window.addtodo = async function () {
    let docRef = await addDoc(collection(db, "todos"), {
        name: getinp.value,
        time: new Date().toLocaleString()
    });
    console.log("Document written with ID: ", docRef.id);
    getinp.value = ''




    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 900,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "ADD todo  successfull"
      });
	

}	  



// 

function getData() {
    let ul = document.querySelector('#getul')
    onSnapshot(collection(db, 'todos'), (data) => {
        data.docChanges().forEach((newData) => {
         ids.push(newData.doc.id)
            if (newData.type == 'removed') {
                let del = document.getElementById(newData.doc.id)
                del.remove()
            }
            else if(newData.type == 'added') {
                // console.log(newData)
                ul.innerHTML += 
`
<li class="completed"  id=${newData.doc.id}>${newData.doc.data().name} 
 ${newData.doc.data().time}
<i class='bx bxs-edit  bx2' title="Edit" onclick="edit(this,'${newData.doc.id}')"></i>                             
<i class='bx bxs-message-rounded-x bx1 'onclick="delTodo('${newData.doc.id}')"  title="Delete"  ></i>`

            }
        })
    })
}



getData()

async function delTodo(id) {
    await deleteDoc(doc(db, "todos", id));

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Delete  successfull"
      });
}


async function edit(e,id) {
    let editval = prompt('Enter Edit value')
    if(editval == ''){
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please Entera value",
           
          });
        


    }
    else{
 e.parentNode.firstChild.nodeValue = editval
    await updateDoc(doc(db, "todos", id), {
        name: editval,
        time: new Date().toLocaleString()
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 700,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Edit successfull"
      });


    }
   
}

  function dlall(){

 Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert todos!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        
      })
 
      .then(async(result) => {


        let getul = document.getElementsByClassName('getul')
        getul.innerHTML =" ";
        for(let i= 0; i<ids.length; i++){
            await deleteDoc(doc(db, "todos", ids[i]));
    
        }
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your todos has been deleted.",
            icon: "success"
          });
        }   
      });









}


    // let li = document.getElementsByClassName('list')
    // li.innerHTML=" ";
    // for(let i= 0; i<ids.length; i++){
    //     await deleteDoc(doc(db, "todos", ids[i]));

    // }





   






window.getData = getData
window.delTodo = delTodo
window.edit = edit
window.dlall=dlall




















