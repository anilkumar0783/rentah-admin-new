import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Partials/Navbar';
import Side from '../Partials/Side'
import { Bars, LineWave } from 'react-loader-spinner'
import { hover } from '@testing-library/user-event/dist/hover';
import { ToastContainer, toast } from "react-toastify";
import AddSubAdmin from './AddSubAdmin';
import EditSubAdmin from './EditSubAdmin';
function SubAdmin() {
    let location = useLocation()
  const [data, setNewData] = useState([])
  const [admins, setAdmins] = useState([])
  const [currPage, setCurrPage] = useState(20)
  const [search, setSearch] = useState("")
  const [postPerPage, setPostPerPage] = useState(20)
  const [loaded, setLoaded] = useState(true)
  const token = localStorage.getItem('token')
  const [adminId,setAdminId]=useState("")


  function handleSearch(e) {
    
    setSearch(e.target.value)
    setAdmins([])
    setCurrPage(0)
  }



useEffect(()=>{
    fetch(`http://24.199.104.72/api/sub-Admins/all`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status == true) {
                  
                  
                    //  toast.success(response.message)
                     setAdmins(response.data)
                     console.log(response.data)
                 
                }else{
                     toast.error(response.message)
                }
            })
},[])
  const handleIntersection = (entries) => {
    const [entry] = entries;
    if(admins.length>=20){
    if (entry.isIntersecting) {
      // The element is intersecting with the viewport, load more data
      setCurrPage(currPage+postPerPage);
    }
  }
  };
  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1, // Trigger the intersection callback when 10% of the target is visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const target = document.querySelector('#scroll-target'); // Change this selector to your target element

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [admins]);

  


  function handleDeleteUser(e,adminId){
    const userRes=  window.confirm("Are you sure to delete sub-Admin")
        if(userRes===true){
          fetch(`http://24.199.104.72/api/sub-Admin/${adminId}`, {
            method:"DELETE",
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status == true) {
                  
                  
                     toast.success(response.message)
                     window.location.reload();
                 
                }else{
                     toast.error(response.message)
                }
            })
        }
  }



  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className='col-md-2'></div>
          <div className='col-md-10'>
          <ToastContainer/>
            <div>
                    <button className='btn mt-3' style={{background :"#179778"}} data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2">Add Sub-Admin +</button>
                </div>
            {loaded == false ?
              <div className="loader" style={{ marginLeft: "46%", marginTop: "21%" }}>
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
                {/* <div className='search-user'>
                  <input type='search' onChange={(e) => { handleSearch(e) }} className='mt-3 mb-3 ' placeholder='Search By Name' />
                </div> */}
                <div className='table-banner'>
                  <table className='table table-borderless text-center mt-5 table-banner'>
                    <thead className='mb-2'>
                      <tr className='' style={{ background: "#F6F6F6", height: "50px" }}>
                        <th>S No</th>
                 
                        <th>Full Name</th>
                        <th>Email</th>
                     
                        <th>Password</th>
                        <th>List</th>
                        <th>Request</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {admins.map((i, key) => (
                        <>
                          <tr className="mt-2" style={{ background: "#F0EBEB" }}>
                            <td>{key + 1}</td>
                           
                            <td>{`${i.firstName} ${i.lastName}`}</td>
                            {i.email==""?
                          <td>null</td> 
                          :
                          <td>{i.email}</td>
                          }
                           
                          
                            <td>{i.password}</td>
                            <td>{i.Listings}</td>
                            <td>{i.requests}</td>
                           <td><button className='btn' data-bs-toggle="modal" onClick={() => {
        setAdminId(i.adminId);
        console.log(i.adminId);
    }}
              data-bs-target="#staticBackdrop3" style={{ background: "green",color:"white", fontWeight: "bold" }}>Edit</button></td>
                            <td><Link onClick={(e)=>{handleDeleteUser(e,i._id)}} className='btn' style={{ background: "red", fontWeight: "bold" }}>Delete</Link></td>
                          </tr>
                          <br />
                        </>
                      ))}

                    </tbody>
                  </table>
                  {admins.length>=10 &&
                  <div id="scroll-target" style={{ height: '2px',marginLeft: "46%" }}>
                    <LineWave
                      height="100"
                      width="100"
                      color="#4fa94d"
                      ariaLabel="line-wave"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  </div>
}
                </div>
                {/* <div className='btn-paging'>
              <button className='btn ms-3' style={{background :"grey"}} onClick={handlePrev}>PREV</button>
              </div>
              <div className='btn-paging'>
              <p className='pages ms-3 mt-1'>{currPage} of {totalPages}</p>
              </div>
              <div className='btn-paging'>
              <button className='btn ms-3 ' style={{background :"#179778"}} onClick={handleNext}>NEXT</button>
              </div> */}
              </>
            }
          </div>
        </div>
        <div
        class="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{ border: "none" }}
        >
          <div
            class="modal-content"
            style={{ borderRadius: "15px", border: "none" }}
          >
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdrop">
                Add Sub-Admin
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <AddSubAdmin/>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="staticBackdrop3"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{ border: "none" }}
        >
          <div
            class="modal-content"
            style={{ borderRadius: "15px", border: "none" }}
          >
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdrop">
                Edit Sub-Admin
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            <EditSubAdmin adminId={adminId}/>
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default SubAdmin;