
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore  ,collection, addDoc , getDocs ,onSnapshot , doc, deleteDoc ,updateDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyD52tNswEOG9bq-xqYotmQK3vRwa2rtm2Q",
    authDomain: "restaurent-app-dc0dd.firebaseapp.com",
    projectId: "restaurent-app-dc0dd",
    storageBucket: "restaurent-app-dc0dd.appspot.com",
    messagingSenderId: "486216927034",
    appId: "1:486216927034:web:3f66472dcda9f897737203",
    measurementId: "G-0L52VFQ7ZS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
//   sign up start 
let ids = []

  
       

  let n = document.getElementById('n')
  let email = document.getElementById('email')
  let password = document.getElementById('password') 
let btn = document.getElementById('btn')
if(btn){
btn.addEventListener('click',()=>{
 
  createUserWithEmailAndPassword(auth, email.value, password.value ,n.value)
  .then(async(userCredential) => {
    // Signed up 

    // let time = new Date().toLocaleString().slice(4,14)
    // let getdate = time.getdate()
    // console.log(getdate);
    const user = userCredential.user;
    try {
      const docRef = await addDoc(collection(db, "users"), {
        fulln : n.value,
        email: email.value,
        password: password.value,
        time : new Date().toString().slice(0,10),
        uid : user.uid
       });
        Swal.fire({
        title: "Good job!",
        text: "Sign in successful",
        icon: "success"
         });

      email.value='',
      password.value='',
      n.value=''
      
     
      console.log("Document written with ID: ", docRef.id);
      location.href = './login.html'

    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // ...
  })
  .catch((error) => {

    email.value='',
    password.value='',
    n.value=''

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})
}

// sign up end 

// sign in start


let sbtn = document.getElementById('sbtn')

if(sbtn){

let semail = document.getElementById('semail')
let spassword = document.getElementById('spassword')



sbtn.addEventListener('click',()=>{
    if(semail.value == 'admin@gmail.com' && spassword.value == 123456 ){
        location.href = './for.html'
    }

    signInWithEmailAndPassword(auth, semail.value, spassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user)
      semail.value=''
      spassword.value = ''
      Swal.fire({
        title: "Good job!",
        text: "Sign in successful",
        icon: "success"
      });
      
      // location.href = './'
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      semail.value=''
      spassword.value = ''
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });



    });
})
}


//  sign up with google 

let gbtn = document.getElementById('gbtn')

if(gbtn){

gbtn.addEventListener('click',()=>{

  signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('Succesful'); 
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
   
  });
})
}

// 



     



      
// Read data 





let getalluser = async()=>{

  const query = await getDocs(collection(db, "users"));
  query.forEach((doc) => {
    
  // console.log(`${doc.id} =>` ,doc.data()); 
 
let user = document.getElementById('user')


if(user){


user.innerHTML +=`
<tr  >
<td>
                <img src="./people.png">
                <p>${doc.data().fulln}</p>
              </td>
              <td>${doc.data().email}</td>
              <td><span ></span>${doc.data().time}</td>
              </tr>
 

`
    }
  
  
});



}



getalluser()






// Update Document eamil password

// let Update = document.getElementById('Update')
// if(Update){
// Update.addEventListener('click',async()=>{
//     const id = auth.currentUser.uid 
//     const washingtonRef = doc(db, "users", id);

//     let email = document.getElementById('email')
//     let password = document.getElementById('password')

//     try{
//           await updateDoc(washingtonRef, {
//       email: email.value ,
//       password : password.value
      
// });
// console.log('update')
//     }catch(err){

//       console.log(err)
//     }

    



// })


// }



// todos 

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



