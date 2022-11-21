import React from 'react'
import { useState } from 'react';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



const handleSubmit =event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // let data=JSON.stringify({
    //         email: email,
    //         password:password
    //       });
    // axios.post('http://localhost:4000/user/login',data)
    // .then(res=>{
    // console.log(res);
    
    // //window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
    // })

    fetch("http://localhost:4000/user/login", {
  "method": "POST",
  "headers": {
    "x-rapidapi-host": "fairestdb.p.rapidapi.com",
    "x-rapidapi-key": "apikey",
    "content-type": "application/json",
    "accept": "application/json"
  },
  "body": JSON.stringify({
    email: email,
    password: password
  })
})
.then(response => {
    if(response.status===200){
    console.log(response);
    window.location.assign('http://localhost:3000/home');

    }
    else{
        alert("Unsuccessful");
    }

})
.catch(err => {
  console.log(err);

});
        
    console.log('email 👉️', email);
    console.log('password 👉️', password);
};



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for="email">Email:</label><br />
                <input type="email" id="email" name="email" onChange={event => setEmail(event.target.value)} value={email} /><br />
                <label for="password">Password:</label><br />
                <input type="password" id="password" name="password"  onChange={event => setPassword(event.target.value)}
          value={password}/><br />
                <input type="submit" id="submit" name="submit" />
            </form>
        </div>
    )
}

export default Login