import { useEffect, useState } from "react";
import Navbar from "../Partials/Navbar";
import Side from "../Partials/Side";
import { Bars } from  'react-loader-spinner'
function Dashboard() {
  const [user,setUser] = useState({})
  const[listing,setListing]=useState({})
  const[request,setRequest]=useState({})
  const[loaded,setLoaded]=useState(false)
  const token= localStorage.getItem('token')
    useEffect(()=>{
        fetch('http://24.199.104.72/api/users/admin-dashboard',{
        headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
    }).then((res)=>{return res.json()})
    .then((response)=>{
        if(response.status===true){
            setUser(response.user)
            setListing(response.listing)
            setRequest(response.userRequest)
            setLoaded(true)
            // console.log(seeker)
        }
    })
    },[])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Side />
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                       <Navbar/>
                       {loaded===false ? 
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
                       <div className="card-dashboard">
                        <div className="dashboard-card-top">
                        <h4>OverAll Listings</h4>
                          <h1>{listing.overall}</h1>
                        </div>
                          
                          <div className="dashboard-card-bottom">
                            <h6>Today</h6>
                            <h4>{listing.today}</h4>
                          </div>
                          <div className="dashboard-card-middle">
                          <p className="ms-5 mt-4">|</p>
                          </div>
                         
                          <div className="dashboard-card-bottom ms-5" >
                            <h6>Last Month <i class="bi bi-filter"></i></h6>
                            <h4>{listing.lastMonth}</h4>
                          </div>
                       </div>
                       <div className="card-dashboard">
                        <div className="dashboard-card-top">
                        <h4>OverAll Request</h4>
                          <h1>{request.overall}</h1>
                        </div>
                          
                          <div className="dashboard-card-bottom">
                            <h6>Today</h6>
                            <h4>{request.today}</h4>
                          </div>
                          <div className="dashboard-card-middle">
                          <p className="ms-5 mt-4">|</p>
                          </div>
                         
                          <div className="dashboard-card-bottom ms-5" >
                            <h6>Last Month <i class="bi bi-filter"></i></h6>
                            <h4>{request.lastMonth}</h4>
                          </div>
                       </div>
                       
                       <div className="card-dashboard">
                        <div className="dashboard-card-top">
                        <h4>Total Users</h4>
                          <h1>{user.overall}</h1>
                        </div>
                          
                          <div className="dashboard-card-bottom">
                            <h6>Today</h6>
                            <h4>{user.today}</h4>
                          </div>
                          <div className="dashboard-card-middle">
                          <p className="ms-5 mt-4">|</p>
                          </div>
                         
                          <div className="dashboard-card-bottom ms-5" >
                            <h6>Last Month <i class="bi bi-filter"></i></h6>
                            <h4>{user.lastMonth}</h4>
                          </div>
                       </div>
                       {/* <div className="card-dashboard">
                        <div className="dashboard-card-top">
                        <h4>OverAll Listings</h4>
                          <h1>1.1k</h1>
                        </div>
                          
                          <div className="dashboard-card-bottom">
                            <h6>Today</h6>
                            <h4>123</h4>
                          </div>
                          <div className="dashboard-card-middle">
                          <p className="ms-5 mt-4">|</p>
                          </div>
                         
                          <div className="dashboard-card-bottom ms-5" >
                            <h6>Last Month <i class="bi bi-filter"></i></h6>
                            <h4>89</h4>
                          </div>
                       </div> */}
                       </>
}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;