import { useEffect, useRef, useState } from "react";
import Navbar from "../Partials/Navbar";
import Side from "../Partials/Side";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
function MoreDetails() {
  const [user, setUser] = useState({});
  const [listings, setListings] = useState([]);
  const [request, setRequest] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();
  const [editingMode, setEditingMode] = useState(false);
  const token = localStorage.getItem("token");
  const [fullName,setFullName]=useState("")
  const [phone,setPhone]=useState("")
  const [email,setEmail]=useState("")
  const[socialLink,setSocialLink]=useState("")
  const [address,setAddress]=useState("")
  const [longitude,setLongitude]=useState("")
  const [latitude,setLatitude]=useState("")
  const [city,setCity]=useState("")
  const [state,setState]=useState("")
  const [description,setDescription]=useState("")
  const [profilePicture,setProfilePicture]=useState("")
  const [coverImage,setCoverImage]=useState("")
  const[website,setWebsite]=useState("")
  const[deviceType,setDeviceType]=useState("")
  const[cashAppId,setCashAppId]=useState("")
  const[businessName,setBusinessName]=useState("")
  const[sendEmail,setSendEmail]=useState("")
  const[notes,setNotes]=useState("")

  let Navigate = useNavigate();
  useEffect(() => {
    fetch(`http://24.199.104.72/api/users/${userId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == true) {
          setIsLoaded(true);
          setUser(response.user);
          setListings(response.listings);
          setRequest(response.userRequests);
          console.log(response.userRequests);
          setFullName(response.user.fullName)
          setPhone(response.user.phone)
          setEmail(response.user.email)
          setSocialLink(response.user.socialLink)
          setAddress(response.user.address)
          setLatitude(response.user.latitude)
          setLongitude(response.user.longitude)
          setCity(response.user.city)
          setState(response.user.state)
          setDescription(response.user.description)
          setProfilePicture(response.user.profilePicture)
          setCoverImage(response.user.coverImage)
          setWebsite(response.user.website)
          setDeviceType(response.user.deviceType)
          setCashAppId(response.user.cashAppId)
        }
      });
  }, []);

  function handleDeleteList(e, listId) {
    const confirm = window.confirm("Are you sure to delete this listing");
    if (confirm === true) {
      fetch(`http://24.199.104.72/api/listings/${listId}/delete`, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.status == true) {
            toast.success(response.message);
            const filterlist = listings.filter((i) => {
              return i._id !== listId;
            });
            setListings(filterlist);
          } else {
            toast.error(response.message);
          }
        });
    }
  }
  function handleDeleteRequest(e, userRequestId) {
    fetch(`http://24.199.104.72/api/user-requests/${userRequestId}/delete`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == true) {
          toast.success(response.message);
          const filterlist = request.filter((i) => {
            return i._id !== userRequestId;
          });
          setRequest(filterlist);
        } else {
          toast.error(response.message);
        }
      });
  }
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const handleIconClickCover = () => {
    fileInputRef2.current.click();
  };
  function handleFileChangeProfile(e){
    const formData = new FormData();

    formData.append('newImage', e.target.files[0])

    // console.log(fileList)
    fetch(`http://24.199.104.72/api/upload-single-image`, {
        method: "POST",
        //  headers :{"Content-Type":"application/json" },
        body: formData
    }).then((res) => { return res.json() })
        .then(response => {
            setProfilePicture(response.imageUrl)
        })
  }
  function handleFileChangeCover(e){
    const formData = new FormData();

        formData.append('newImage', e.target.files[0])

        // console.log(fileList)
        fetch(`http://24.199.104.72/api/upload-single-image`, {
            method: "POST",
            //  headers :{"Content-Type":"application/json" },
            body: formData
        }).then((res) => { return res.json() })
            .then(response => {
                setCoverImage(response.imageUrl)
            })
  }

function handleSubmit(e){
    e.preventDefault()
    let formData={fullName,phone,email,socialLink,address,longitude,latitude,city,state,description,profilePicture,coverImage,website,deviceType,cashAppId}
  fetch(`http://24.199.104.72/api/admin/user/${userId}/edit`, {
    method: "POST",
    headers :{"Content-Type":"application/json" },
    body: JSON.stringify(formData)
}).then((res) => { return res.json() })
    .then(response => {
        if(response.status===true){
            window.location.reload()
        }
    })
}

function handleSendEmail(){
 if(businessName===""){
  toast.error("Enter business name")
 }else if(sendEmail===""){
  toast.error("Enter valid email")
 }
 else{

 
  let formData={businessName,sendEmail}
  console.log(formData)
  fetch("http://24.199.104.72/api/admin/send-email" ,{
    method:"POST",
    headers :{"Content-Type":"application/json" },
    body: JSON.stringify(formData)
  }).then((res) => { return res.json() })
  .then(response => {
      if(response.status===true){
          window.location.reload()
      }
  })
}
 }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <ToastContainer />
            <Navbar />
            {isLoaded == false ? (
              <div
                className="loader"
                style={{ marginLeft: "46%", marginTop: "21%" }}
              >
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
            ) : (
              <>
                <nav className="navbar navbar-expand-lg navbar-light  mt-2">
                  <div className="container-fluid">
                    <i
                      className="bi bi-chevron-compact-left fs-2"
                      onClick={() => {
                        Navigate(-1);
                      }}
                      style={{ cursor: "pointer" }}
                    ></i>
                    <a className="navbar-brand" href="#">
                      {" "}
                      User Details
                    </a>
                    <button
                    data-bs-toggle="modal" data-bs-target="#exampleModal" 
                    className="btn btn-success mx-5 "
                    style={{
                      border: "none",
                      cursor: "pointer",
                      borderRadius:"5px",
                      textAlign:"center"
                      
                    }}
                    onClick={()=>{setBusinessName(user.fullName);setSendEmail(user.email)}}
                    >Send email</button>

                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse "
                      id="navbarNavDropdown"
                    >
                      <ul className=" navbar-nav ms-auto">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="#"
                          ></a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="#"
                          ></a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            aria-current="page"
                            href="#"
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>

                <div className="row">
                  <div class="form-check form-switch ms-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onClick={(e) => {
                        if (editingMode === false) {
                          setEditingMode(true);
                        } else {
                          setEditingMode(false);
                        }
                      }}
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Editing Mode
                    </label>
                  </div>
                  <div
                    className="column-1 bg-light"
                    style={{ overflowY: "scroll", height: "80vh" }}
                  >
                  
                    <div>
                        <div>

                        
                      <img
                        style={{ width: "350px", height: "200px" }}
                        src={coverImage}
                      />
                      {editingMode===true && 
                      <div style={{position:"relative",bottom:"200px"}}>
                          <input
                            type="file"
                            ref={fileInputRef2}
                            style={{ display: "none" }}
                             onChange={handleFileChangeCover}
                          />
                          <button
                            onClick={handleIconClickCover}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <i
                              className="bi bi-pencil-fill text-light"
                              style={{ fontSize: "20px" }}
                            ></i>{" "}
                            {/* FontAwesome edit icon */}
                          </button>
                        </div>
}
                      </div>
                      <div>
                        <img
                          style={{
                            width: "100px",
                            height: "90px",
                            // borderRadius: "50%",
                            position: "relative",
                            top: "-70px",
                            left: "130px",
                          }}
                          src={profilePicture}
                        />
                        {editingMode===true &&
                        <div style={{position:"relative",bottom:"170px",left:"200px"}}>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                             onChange={handleFileChangeProfile}
                          />
                          <button
                            onClick={handleIconClick}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <i
                              className="bi bi-pencil-fill text-light"
                              style={{ fontSize: "20px" }}
                            ></i>{" "}
                            {/* FontAwesome edit icon */}
                          </button>
                        </div>
}
                      </div>
                    </div>
                    <form method="post" onSubmit={(e)=>{handleSubmit(e)}}>
                    <label>Username*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      //   placeholder={`UserName: ${user.fullName}`}
                      value={fullName}
                      onChange={(e)=>{setFullName(e.target.value)}}
                    />
                    <label className="mt-1">Phone*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={phone}
                      onChange={(e)=>{setPhone(e.target.value)}}
                    />
                    <label className="mt-1">Description*</label>
                    <textarea
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={description}
                      onChange={(e)=>{setDescription(e.target.value)}}
                    />
                    <label className="mt-1">Email*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <label className="mt-1">Social Link</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={socialLink}
                      onChange={(e)=>{setSocialLink(e.target.value)}}
                    />
                    <label className="mt-1">Cash App/Venmo*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={cashAppId}
                      onChange={(e)=>{setCashAppId(e.target.value)}}
                    />
                    <label className="mt-1">Website*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={website}
                      onChange={(e)=>{setWebsite(e.target.value)}}
                    />
                    <label className="mt-1">City*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={city}
                      onChange={(e)=>{setCity(e.target.value)}}
                    />
                    <label className="mt-1">State*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={state}
                      onChange={(e)=>{setState(e.target.value)}}
                    />
                    <label className="mt-1">Address*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={address}
                      onChange={(e)=>{setAddress(e.target.value)}}
                    />
                    <label className="mt-1">Latitude*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={latitude}
                      onChange={(e)=>{setLatitude(e.target.value)}}
                    />
                    <label className="mt-1">Longitude*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={longitude}
                      onChange={(e)=>{setLongitude(e.target.value)}}
                    />
                    <label className="mt-1">Device Type*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      disabled={!editingMode}
                      style={{ height: "55px" }}
                      value={deviceType}
                      onChange={(e)=>{setDeviceType(e.target.value)}}
                    />
                    <input
                      type="text"
                      className="form-control mt-3"
                      disabled
                      style={{ height: "55px" }}
                      placeholder={`Joined On: ${new Date(
                        user.creationTimeStamp
                      ).getDate()}/${
                        new Date(user.creationTimeStamp).getMonth() + 1
                      }/${new Date(user.creationTimeStamp).getFullYear()}`}
                    />
                    {editingMode === true && (
                      <button className="btn btn-success mt-3 float-end" type="submit">
                        Update
                      </button>
                    )}
                    </form>
                  </div>
                  <div className="column-2 bg-light">
                    <div className="listing-column">
                      <h3>Listings</h3>

                      {listings.length == 0 && <p className="">no Record</p>}
                      {listings.map((i) => (
                        <div className="card-list mb-3">
                          <div className="row g-0">
                            <div className="col-md-4">
                              <div
                                id="carouselExampleControls"
                                class="carousel slide"
                                data-bs-ride="carousel"
                              >
                                <div class="carousel-inner">
                                  <div class="carousel-item active">
                                    <img
                                      src={i.listingPhotos}
                                      class="d-block w-100"
                                      alt="..."
                                      style={{
                                        width: "200px",
                                        height: "150px",
                                      }}
                                    />
                                  </div>
                                </div>

                                <button
                                  class="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExampleControls"
                                  data-bs-slide="prev"
                                >
                                  <span
                                    class="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Previous</span>
                                </button>
                                <button
                                  class="carousel-control-next"
                                  type="button"
                                  data-bs-target="#carouselExampleControls"
                                  data-bs-slide="next"
                                >
                                  <span
                                    class="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Next</span>
                                </button>
                              </div>
                            </div>

                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">{i.title}</h5>
                                <span className="card-text">
                                  {i.location}/{i.budget}
                                </span>
                                <button
                                  className="btn btn-danger mt-2"
                                  onClick={(e) => {
                                    handleDeleteList(e, i._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <Link
                                  to={`/users/listing/${i._id}`}
                                  style={{ textDecoration: "none" }}
                                  className="btn btn-success mt-2 ms-2"
                                >
                                  View{" "}
                                </Link>
                              </div>
                            </div>
                            {/* <div className="ms-1">
                                                                    <span className="card-text"><small className="text-muted">{i.budget}</small></span>
                                                                    <br />
                                                                    <span className="card-text"><small className="text-muted">{i.location}</small></span>
                                                                </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="request-column">
                      <h3>Request</h3>
                      {request.length == 0 && <p className="">no Record</p>}
                      {request.map((i) => (
                        <div className="card-list mb-3">
                          <div className="row g-0">
                            <div className="col-md-4">
                              <div
                                id="carouselExampleControls"
                                class="carousel slide"
                                data-bs-ride="carousel"
                              >
                                <div class="carousel-inner">
                                  <div class="carousel-item active">
                                    <img
                                      src={i.listingPhotos}
                                      class="d-block w-100"
                                      alt="..."
                                      style={{
                                        width: "200px",
                                        height: "150px",
                                      }}
                                    />
                                  </div>
                                </div>
                                <button
                                  class="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExampleControls"
                                  data-bs-slide="prev"
                                >
                                  <span
                                    class="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Previous</span>
                                </button>
                                <button
                                  class="carousel-control-next"
                                  type="button"
                                  data-bs-target="#carouselExampleControls"
                                  data-bs-slide="next"
                                >
                                  <span
                                    class="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Next</span>
                                </button>
                              </div>
                            </div>

                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">{i.title}</h5>
                                <span className="card-text">
                                  {i.description}
                                </span>
                                <button
                                  className="btn btn-danger mt-2"
                                  onClick={(e) => {
                                    handleDeleteRequest(e, i._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <Link
                                  to={`/users/request/${i._id}`}
                                  style={{ textDecoration: "none" }}
                                  className="btn btn-success mt-2 ms-2"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                   
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Send Email</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setSendEmail(""); setBusinessName(""); setEmail("") }}></button>
                                                </div>
                                                <div class="modal-body">
                                                  Business name* <br/>
                                                   <input  
                                                   value={businessName}
                                                   onChange={(e)=>setBusinessName(e.target.value)}
                                                   className="form-control" style={{borderRadius:"6px"}}></input><br/>  
                                                   Email* <br/>
                                                   <input
                                                     value={sendEmail}
                                                     onChange={(e)=>setSendEmail(e.target.value)}
                                                   className="form-control" style={{borderRadius:"6px"}}></input>
                                                  
                                                </div>
                                                <div class="text-end p-3 px-3 ">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{ setFullName(""); setEmail("") }}>Cancel</button>&nbsp;&nbsp;
                                                    <button onClick={handleSendEmail} class="btn btn-primary">Send</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

    </>
  );
}

export default MoreDetails;
