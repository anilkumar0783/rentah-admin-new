import Side from "../Partials/Side";
import { useEffect, useState } from "react";
//import Side from "../Partials/Side";
import { Link } from "react-router-dom";
import { Bars } from  'react-loader-spinner'
function Support() {
   const[support,setSupport]= useState([])
 const[loaded,setLoaded] =useState(false)
 const token= localStorage.getItem('token')

 useEffect(()=>{
   fetch(`http://24.199.104.72/api/support-queries`,{
       headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
   }).then((res)=>{return res.json()})
   .then(response=>{
       if(response.status===true){
           setSupport(response.data)
           setLoaded(true)
           //alert("yess")
       }
   })
},[])
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
          <div>
                <table className='table table-borderless text-center mt-5'>
                    <thead className='mb-2'>
                        <tr className=''style={{background :"#F6F6F6",height :"50px"}}>
                            <th>S No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Query</th>
                            <th>Posted On</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {support.map((i,key)=>(
                            <>
                            <tr className="mt-2" style={{background :"#F0EBEB"}}>
                            <td>{key+1}</td>
                            <td>{i.userName}</td>
                            <td>{i.email}</td>
                            <td>{i.title}</td>
                            <td>{i.description}</td>
                            <td></td>
                        </tr>
                        <br/>
                        </>
                        ))}
                        
                    </tbody>
                </table>
               </div>
}
            </div>
         </div>
         </div>
        </>
     );
}

export default Support;