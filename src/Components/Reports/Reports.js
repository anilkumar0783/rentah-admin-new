import { useEffect, useState } from "react";
import Side from "../Partials/Side";
import { Link, useLocation } from "react-router-dom";
import { Bars } from  'react-loader-spinner'
function Reports() {
 const[report,setReport]= useState([])
 const[loaded,setLoaded] =useState(false)
 const token= localStorage.getItem('token')
 let location =useLocation()
 const [data,setNewData]=useState([])
 const [currPage, setCurrPage] = useState(1)
    const[search,setSearch]=useState("")
const [postPerPage, setPostPerPage] = useState(10)
 useEffect(()=>{
    fetch(`http://24.199.104.72/api/reports`,{
        headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
    }).then((res)=>{return res.json()})
    .then(response=>{
        if(response.status===true){
            setReport(response.reports)
            setLoaded(true)
           //console.log(response.reports)
        }
    })
 },[])
 

 useEffect(()=>{
    const lastPostIndex= currPage * postPerPage;
    const firstPostIndex= lastPostIndex - postPerPage;
    
        setNewData(report.slice(firstPostIndex,lastPostIndex))
    },[data])
    let totalPages= Math.ceil((report.length)/postPerPage)
    function handlePrev(){
        if(currPage>=2){
     setCurrPage(currPage-1)
        }
     }
      function handleNext(){
        if(totalPages>currPage){
           setCurrPage(currPage+1)
        
        }
      
    }

     
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
          <div className="table-banner">
                <table className='table table-borderless text-center mt-5'>
                    <thead className='mb-2'>
                        <tr className=''style={{background :"#F6F6F6",height :"50px"}}>
                            <th>S No</th>
                            <th>Report Id</th>
                            <th>Reported By</th>
                            <th>Reported User</th>
                            <th>Report Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {data.map((i,key)=>(
                            <>
                            <tr className="mt-2" style={{background :"#F0EBEB"}}>
                            <td>{key+1}</td>
                            <td>{i._id}</td>
                            <td>{i.userId}</td>
                            <td>{i.reportUserId}</td>
                            <td>{i.reportStatus}</td>
                            
                            <td><Link to={{
                                pathname:`/reports/moreDetails`,
                                state: {userData:i?.userData} 
                                }} className='btn' style={{background :"#D9D9D9",fontWeight :"bold"}}>View Details</Link></td>
                        </tr>
                        <br/>
                        </>
                        ))}
                        
                    </tbody>
                </table>
               </div>
               <div className='btn-paging'>
               <button className='btn ms-3' style={{background :"grey"}} onClick={handlePrev}>PREV</button>
               </div>
               <div className='btn-paging'>
               <p className='pages ms-3 mt-1'>{currPage} of {totalPages}</p>
               </div>
               <div className='btn-paging'>
               <button className='btn ms-3 ' style={{background :"#179778"}} onClick={handleNext}>NEXT</button>
               </div>
               </>
}

          </div>
          </div>
          </div>
        </>
     );
}

export default Reports;