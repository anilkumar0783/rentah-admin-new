import { useState } from "react";
import Side from "../Partials/Side";
import { ToastContainer ,toast } from "react-toastify";
import { Bars } from  'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css';
function Notification() {
    const [title,setTitle]=useState()
    const [message,setMessage]=useState()
    const token= localStorage.getItem('token')
    const [loaded,setLoaded]=useState(true)
   function handleSubmit(e){
    setLoaded(false)
    e.preventDefault()
    let formData={title,message}
    console.log(title,message)
    fetch(`http://24.199.104.72/api/notifications/users`,{
        method :"POST",
        headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" },
        body :JSON.stringify(formData)
    }).then((res)=>{return res.json()})
    .then(response=>{
        if(response.status===true){
            alert('hello')
            toast.success(response.message)
            setLoaded(true)
        }else{
           toast.error("notification couldn't send")
        }
    })
    }
    return ( 
        <>
           <div className="container-fluid">
           <div className="row">
            <Side/>
            <div className='col-md-2'></div>
            
            <div className='col-md-10'>
                {loaded==false &&
                       <div className="loader col-md-10" style={{position :"fixed", background :"black",opacity :"50%",color:"#179778", width :"100%",height :"100%"}}>
                        <div style={{marginLeft :"40%",marginTop :"21%"}}>
                       <Bars 
                       
                       height="60"
                       width="60"
                       color="#179778"
                       ariaLabel="bars-loading"
                       wrapperStyle={{}}
                       wrapperClass=""
                       visible={true}
                      
                     />
                     </div>
                      </div>
}
                       <>
                <ToastContainer/>
                <div className="send-noti-div-p">
                <div className="send-noti-div">
                    <form method="post" onSubmit={(e)=>{handleSubmit(e)}}>
                        <label className="form-label mt-3 ">Title</label>
                        <br/>
                        <input type="text" className=" form-control"
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        />
                        <br/>
                        <label className="form-label ">Message</label>
                        <br/>
                        <textarea className="text-area form-control" value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                        <button type="submit" className="btn form-control send-btn mt-4">Send Notification</button>
                    </form>
                    </div>
                </div>
                </>

            </div>

           </div>
           </div>
        </>
     );
}

export default Notification;