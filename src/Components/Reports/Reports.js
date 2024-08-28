import { useEffect, useState } from "react";
import Side from "../Partials/Side";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Bars } from 'react-loader-spinner'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Reports() {
    let navigate= useNavigate()
    const [report, setReport] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState([])
    const [newStatus,setStatus]=useState("")
    const [isreported, setReported] = useState(false)
    const token = localStorage.getItem('token')
    let location = useLocation()
    const [data, setNewData] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [search, setSearch] = useState("")
    const [postPerPage, setPostPerPage] = useState(10)
    useEffect(() => {
        fetch(`http://24.199.104.72/api/reports`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status === true) {
                    setReport(response.reports)
                    setLoaded(true)
                    // console.log(response.reports)
                }
            })
    }, [])
    const inlineStyles = {
        backgroundImage: `url(${user.coverImage})`,
        backgroundSize: 'cover', // Adjust as needed
        // Add more styles here
      };

    useEffect(() => {
        const lastPostIndex = currPage * postPerPage;
        const firstPostIndex = lastPostIndex - postPerPage;

        setNewData(report.slice(firstPostIndex, lastPostIndex))
    }, [data])
    let totalPages = Math.ceil((report.length) / postPerPage)
    function handlePrev() {
        if (currPage >= 2) {
            setCurrPage(currPage - 1)
        }
    }
    function handleNext() {
        if (totalPages > currPage) {
            setCurrPage(currPage + 1)

        }

    }
function handleBan(e,userId){
    fetch(`http://24.199.104.72/api/users/${userId}/ban`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status === true) {
                    toast.success(response.message)
                    // navigate('/reports')
                    setTimeout(()=>{
                        // navigate('/reports')
                        window.location.reload();
                       }, 700);
                    //console.log(response.reports)
                }else{
                    toast.error(response.message)
                }
            })
}
function hanleStatusChange(e,reportId){
   let newStatus=  e.target.value
    let formData ={newStatus}
    fetch(`http://24.199.104.72/api/reports/${reportId}/status`,{
        method :"POST",
        headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
        body:JSON.stringify(formData)
    }).then((response)=>{
        return response.json()
    }).then(async res=>{
        if(res.status===true){
            toast.success(res.message)
            report.map(i=>{
                if(i._id===reportId){
                    i.reportStatus=newStatus
                }
            })
         
            // setTimeout(()=>{
            //     // navigate('/reports')
            //     window.location.reload();
            //    }, 700);
        }else{
            toast.error(res.message)
        }
    })
}

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Side />

                    <div className='col-md-2'></div>
                   
                    <div className='col-md-10'>
                    <ToastContainer />
                        {loaded == false ?
                            <div className="loader" style={{ marginLeft : "46%", marginTop : "21%" }}>
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
                                            <tr className='' style={{ background: "#F6F6F6", height : "50px" }}>
                                                <th>S No</th>
                                                {/* <th>Report Id</th> */}
                                                <th>Reported By</th>
                                                <th>Reported User</th>
                                                <th>Report Status</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {data.map((i, key) => (
                                                <>
                                                    <tr className="mt-2" style={{ background: "#F0EBEB" }}>
                                                        <td>{key + 1}</td>
                                                        {/* <td>{i._id}</td> */}
                                                        <td>{i.userData.fullName}<i onClick={(e) => { return setUser(i.userData), setReported(false) }} className="bi bi-eye fs-4 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                                                        <td>{i.reportUserData.fullName}<i onClick={(e) => { return setUser(i.reportUserData), setReported(true) }} className="bi bi-eye fs-4 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                                                        <td>
                                                            <select class="form-select" aria-label="Default select example" value={i.reportStatus} onChange={(e)=>{hanleStatusChange(e,i._id)}}>
                                                                {/* <option selected>{i.reportStatus}</option> */}
                                                                <option value="OPEN">OPEN</option>
                                                                <option value="CLOSED">CLOSED</option>
                                                                <option value="STANDBY">STANDBY</option>
                                                            </select>
                                                        </td>

                                                        {/* <td><Link to={{
                                                            pathname: `/reports/moreDetails`,
                                                            state: { userData: i?.userData }
                                                        }} className='btn' style={{ background: "#D9D9D9", fontWeight: "bold" }}>View Details</Link></td> */}
                                                    </tr>
                                                    <br />
                                                </>
                                            ))}

                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">

                                                            <h5 class="modal-title" id="exampleModalLabel">{user.fullName}</h5>

                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <ul class="list-group list-group-flush text-start" style={inlineStyles}>
                                                                <li class="list-group-item text-center" ><img style={{ width : "200px", borderRadius: "50%" }} src={user.profilePicture} /></li>
                                                                <li class="list-group-item">Phone: {user.phone}</li>
                                                                <li class="list-group-item">Email: {user.email}</li>
                                                                <li class="list-group-item">Address: {user.address}</li>
                                                                <li class="list-group-item">Description: {user.description}</li>
                                                                <li class="list-group-item">Website: <a target="_blank" href={`http://${user.website}`}>{user.website}</a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="modal-footer">
                                                            {user.isBanned==0?
                                                            <button type="button" class="btn btn-danger" onClick={(e)=>{handleBan(e,user._id)}}>Ban User</button>
                                                            :
                                                            <button type="button" class="btn btn-danger" onClick={(e)=>alert("Already Banned")}>Banned</button>
}                                                           
                                                            <Link to={`/users/moreDetails/${user._id}`}><button type="button" class="btn btn-success "  data-bs-dismiss="modal" aria-label="Close" >View User</button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='btn-paging'>
                                    <button className='btn ms-3' style={{ background: "grey" }} onClick={handlePrev}>PREV</button>
                                </div>
                                <div className='btn-paging'>
                                    <p className='pages ms-3 mt-1'>{currPage} of {totalPages}</p>
                                </div>
                                <div className='btn-paging'>
                                    <button className='btn ms-3 ' style={{ background: "#179778" }} onClick={handleNext}>NEXT</button>
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