import { Link } from "react-router-dom";
import Side from "../Partials/Side";
import { useEffect, useState } from "react";
import { Bars } from  'react-loader-spinner'
function AdminProfile() {
  const adminId=  localStorage.getItem('adminId')
  const token= localStorage.getItem('token')
   const [visible,setVisible]= useState(false)
   const [admin,setAdmin] =useState({})
   const [loaded,setLoaded] =useState(false)
function handleView(){
    if(visible===true){
        setVisible(false)
    }else if(visible===false){
        setVisible(true)
    }
}

useEffect(()=>{
    fetch(`http://24.199.104.72/api/admins/${adminId}`,{
        headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" },
    }).then((res)=>{return res.json()})
    .then(response=>{
        if(response.status===true){
           setAdmin(response.admin)
           setLoaded(true)
        }
    })
})
    return ( 
        <>
        <div className="container-fluid">
        <div className="row">
            <Side/>
            <div className='col-md-2'></div>
            
            <div className='col-md-10'>
            {loaded==false ? 
                       <div className="loader" style={{marginLeft :"46%",marginTop :"21%"}}>
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
                       :
                       <>
                <div className="admin-div mt-5">
                    {!admin.adminImage===""?
                    <img src={admin.adminImage} style={{width :"300px",height :"300px",borderRadius :"50%"}}/>
                    :
                    <img src="../../image 3.png" style={{width :"300px",height :"300px",borderRadius :"50%"}}/>
                }
                   
                </div>
                <div className="admin-div mt-2">
                <h2>{admin.firstName} {admin.lastName}</h2>
                
                </div>
                <div className="admin-div">
                <h5>Admin-Id: {admin.adminId}</h5>
                
                </div>
                <div className="admin-div mt-3">
                <h6>User Name: {admin.email}</h6>
                </div>
                <div className="admin-div mt-3">
                <h6 className="mt-2">Password:</h6>
                {visible===false?
                <>
                <input type="password" className="" style={{outline :"none" ,borderRadius :"10px" ,marginLeft :"10px"}} value={admin.password} />
                <Link onClick={handleView} className="text-dark fs-5"><i class="bi bi-eye" style={{marginLeft :"-30px"}}></i></Link>
                </>
                :
                <>
                <input type="text" className="" style={{outline :"none" ,borderRadius :"10px" ,marginLeft :"10px"}} value={admin.password} />
                <Link onClick={handleView} className="text-dark fs-5"><i class="bi bi-eye-slash" style={{marginLeft :"-30px"}}></i></Link>
                </>
}

                
                
                </div>
                </>
 }
            </div>
           
        </div>
        </div>
        </>
     );
}

export default AdminProfile;