
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore  ,collection, addDoc , getDocs} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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

  let n = document.getElementById('n')
  let email = document.getElementById('email')
  let password = document.getElementById('password') 
let btn = document.getElementById('btn')
if(btn){
btn.addEventListener('click',()=>{
 
  createUserWithEmailAndPassword(auth, email.value, password.value ,n.value)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    try {
      const docRef = await addDoc(collection(db, "users"), {
        fulln : n.value,
        email: email.value,
        password: password.value,
        time : new Date().toString()
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

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
  console.log(`${doc.id} =>` ,doc.data()); 
  document.write(doc.data().email,doc.time)
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






