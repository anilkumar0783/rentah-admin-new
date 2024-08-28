import { useEffect } from "react";
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
function Side() {
    const[admin,setAdmin]=  useState({})
    const token= localStorage.getItem('token')
    const adminName =localStorage.getItem('adminName')
    const adminType =localStorage.getItem('adminType')
    const rights =localStorage.getItem('rights')
    // useEffect(()=>{
    //     useEffect(()=>{
    //         fetch(`http://24.199.104.72/api/reports`,{
    //             headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
    //         }).then((res)=>{return res.json()})
    //         .then(response=>{
    //             if(response.status===true){
    //                 setAdmin(response.reports)
    //                 // setLoaded(true)
    //                //console.log(response.reports)
    //             }
    //         })
    //      },[])
    // },[])
    return (

    
        <>

            {/* <div className="col-md-2" style={{background :"#9DE7AC" ,height :"100vh",position:"static"}}>
                <h3 className="text-center text-success">RENTAH</h3>
                <p className="ms-3 mt-5 fs-5">MENU</p>
            <NavLink to='/' className="btn side-btn form-control mt-3">DASHBOARD</NavLink>
            <br/>
            <NavLink to='/users' className="btn side-btn form-control mt-3">USERS</NavLink>
            <br/>
            <NavLink to='/reports' className="btn side-btn form-control mt-3 ">REPORTS</NavLink>
            <br/>
            <NavLink to='/banner' className="btn side-btn form-control mt-3 ">BANNERS</NavLink>
            <br/>
            <NavLink to='/abc' className="btn side-btn  form-control mt-3">DASHBOARD</NavLink>s
            <br/>
            <NavLink to='/pqr' className="btn side-btn form-control mt-3">DASHBOARD</NavLink>
            
            </div> */}
            <div className="col-md-2  sidebar " >
            <h3 to='*' className=" fs-3 text-center mt-2" style={{color :"#179778"}}>RENTAH</h3>
            <hr/>
                <div className="">
                {adminType==="superAdmin" &&  <NavLink to="/">DASHBOARD</NavLink>}
                {adminType==="superAdmin" || rights.includes("View users")?   <NavLink to="/users">USERS</NavLink> :<></>}
                {adminType==="superAdmin" || rights.includes("Update banners") ? <NavLink to="/banner">BANNERS</NavLink>:<></>}
                {adminType==="superAdmin" || rights.includes("Send notifications") ?<NavLink to="/notification">NOTIFICATION</NavLink>:<></>}
                {adminType==="superAdmin" || rights.includes("View spam users")?<NavLink to="/reports">REPORTS</NavLink>:<></>}
                {adminType==="superAdmin" || rights.includes("Handle support queries")? <NavLink to="/support">HELP & SUPPORT</NavLink>:<></>}
                {adminType==="superAdmin" || rights.includes("Update categories")?<NavLink to="/category">CATEGORIES</NavLink>:<></>}
                {adminType==="superAdmin" || rights.includes("View listings")?<NavLink to="/listings">LISTINGS</NavLink>:<></>}
                {adminType==="superAdmin" || rights.includes("View requests")?<NavLink to="/requests">REQUESTS</NavLink>:<></>}
                <NavLink to="/business-user">BUSSINESS USERS</NavLink>
                {adminType==="superAdmin" && <NavLink to="/sub-admins">SUB ADMINS</NavLink>}
               
                </div>
                {/* <div style={{marginTop :"65%"}}>
                <div style={{float :"left"}}>
                    <img src="../../image 3.png" style={{width:"50px",height :"50px",borderRadius :"50%"}}/>
                </div>
                <div style={{float :"left" ,marginLeft :"10px"}}>
                <h5 className="h5 ms-2">{adminName}</h5>
                <Link>Log Out</Link>
                </div>
                </div> */}
            </div>
            <div className="col-md-2 drawer" style={{background :"#179778",position :"sticky",top : "0px",width :"100%", zIndex :"999"}}>
                    <Link class=" text-light  " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <i class="bi bi-bar-chart-steps fs-3"></i>
                    </Link>
                    <span to='*' className=" fs-1 ms-3 mt-2" style={{color :"black"}}>RENTAH</span>
                    
                    <div class="offcanvas offcanvas-start" style={{background :"transparent"}} tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        {/* <div class="offcanvas-header" style={{background :"transparent"}}>
                            <h5 class="offcanvas-title text-light" id="offcanvasExampleLabel">Offcanvas</h5>
                            <button type="button" class="btn-close text-reset bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div> */}
                        <div class="offcanvas-body ">
                        <button type="button" class="btn-close text-reset bg-success float-end mt-2 me-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <br/>

                        <NavLink to="/">DASHBOARD</NavLink>
                <NavLink to="/users">USERS</NavLink>
                <NavLink to="/banner">BANNERS</NavLink>
                <NavLink to="/notification">NOTIFICATION</NavLink>
                <NavLink to="/reports">REPORTS</NavLink>
                <NavLink to="/support">SUPPORT</NavLink>
                <NavLink to="/category">CATEGORIES</NavLink>
                <NavLink to="/listings">LISTINGS</NavLink>
                <NavLink to="/requests">REQUESTS</NavLink>
                <NavLink to="/business-user">BUSSINESS USERS</NavLink>
                <NavLink to="/sub-admins">SUB ADMINS</NavLink>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default Side;