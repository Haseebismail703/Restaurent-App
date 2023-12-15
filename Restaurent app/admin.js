

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

//  admin  sign up start 

let dbtn = document.getElementById('dbtn')
if(dbtn){
let dname = document.getElementById('dname')
let rname = document.getElementById('email')
let daddress = document.getElementById('password')
let demail = document.getElementById('password')
let dpassword = document.getElementById('dpassword')


dbtn.addEventListener('click',()=>{


    createUserWithEmailAndPassword(auth, dname.value, rname.value,daddress.value, demail.value,dpassword.value)
    .then(async(userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
     
      // dname.value  = ''
      // rname.value  =''
      // daddress.value =''
      // demail.value =''
      // dpassword.value =''





      
      // ...
      try {
        const docRef = await addDoc(collection(db, "admin reg/log"), {
        FName :  dname.value,
        RName :   rname.value,
        Raddress: daddress.value, 
        Email : demail.value,
        Password  : dpassword.value,
        Uid :  user.uid  
        });

        console.log('added');
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
      // location.href = './login.html'







    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      console.log(errorCode);
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


    signInWithEmailAndPassword(auth, semail.value, spassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      alert('sign in succesfuly')
      semail.value=''
      spassword.value = ''

      // location.href = './welcome.html'
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
})
}




// Read data 





// let getalluser = async()=>{

//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} =>` ,doc.data()); 
//   // document.write(doc.id ,doc.data())
// });
// }

// getalluser()






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



