import { useEffect, useState,useContext } from "react"
import {  useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { LoginContext } from "../../LoginContext";


function Login() {
   const{loginstatus,setLoginstatus,expirationTime,setExpTime} =useContext( LoginContext)
    const[email,setEmail]= useState('')
    const[password , setPassword] =useState('')
    const [token,setToken]=useState("")
    let navigate= useNavigate()
    // let formData ={email , password}
    function handleSubmit(e){
        e.preventDefault()
        const formdata= {email,password}
        fetch('http://24.199.104.72/api/admins/login',{
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body :JSON.stringify(formdata)
        }).then((res)=>{ return res.json()})
        .then(response=>{
            if(response.status==true){
                localStorage.setItem('token',response.token)
                const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('adminId',response.admin.adminId)
                localStorage.setItem('adminImage',response.admin.adminImage)
                localStorage.setItem('adminName',response.admin.firstName + response.admin.lastName)
                localStorage.setItem('loginstatus',1)
                setLoginstatus(localStorage.getItem('loginstatus'))
                setExpTime(localStorage.getItem('expirationTime'))
                toast("login successfull")
                setInterval(navigate('/'),4000)
            }if(response.message=="incoreect Password"){
                toast(response.message)
            }if(response.message=="incoreect email"){
                toast(response.message)
            }
        })
    }
    return ( 
        <div className="conatiner-fluid conatainer-login" >
            <div className="row">
                <div className="col-md-4"></div>
                <ToastContainer style={{color : "red"}}/>
                <div className="col-md-4   login-card">
                    <h4 className="fs-3 mt-3  text-dark">Admin Login</h4>
                    <form className="mt-3" onSubmit={(e)=>{handleSubmit(e)}}>
                        <div className="form-floating mt-5">
                        <input type="email" className="form-control login-input" placeholder="Email Id" 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <label className="">Email Id</label>
                        </div>
                        <div className="form-floating mt-5">
                        <input type="password" className="form-control login-input" placeholder="Password" 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <label className="">Password</label>
                        </div>
                        <button type="submit" className="btn form-control btn-success mt-5 login-input">Login</button>
                    </form>
                    {/* <div>
                        <img src="../../pngwing.com.png" className="login-img" />
                    </div> */}
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
     );
}

export default Login