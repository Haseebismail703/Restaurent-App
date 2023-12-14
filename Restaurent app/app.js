
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore  ,collection, addDoc ,doc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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

//   sign up start 

let btn = document.getElementById('btn')
if(btn){

let email = document.getElementById('email')
let password = document.getElementById('password')
let name1 = document.getElementById('name1')
btn.addEventListener('click',()=>{


    createUserWithEmailAndPassword(auth, email.value, password.value,name1.value)
    .then(async(userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
      email.value=''
      password.value = ''
      
   


      try {
        await setDoc(doc(db, "users ", user.uid), {
          Name : name1.value,  
          email: email.value,
          password: password.value,
          uid : user.uid
          
        });

        console.log('added');
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
      location.href = './login.html'







    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

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
      console.log(user)
      alert('sign in succesfuly')
      semail.value=''
      spassword.value = ''

      
    //   location.href = './welcome.html'
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
})
}