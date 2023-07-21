import { useEffect, useState } from "react";
import Navbar from "../Partials/Navbar";
import Side from "../Partials/Side";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Bars } from 'react-loader-spinner'
function MoreDetails() {
    const [user, setUser] = useState({})
    const [listings, setListings] = useState([])
    const [request, setRequest] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const { userId } = useParams()
    const token = localStorage.getItem('token')
   let Navigate= useNavigate()
    useEffect(() => {
        fetch(`http://24.199.104.72/api/users/${userId}`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status == true) {
                    setIsLoaded(true)
                    setUser(response.user)
                    setListings(response.listings)
                    setRequest(response.userRequests)
                    console.log(response.userRequests)
                }
            })
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Side />
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        <Navbar />
                        {isLoaded == false ?
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
                                <nav className="navbar navbar-expand-lg navbar-light  mt-2">
                                    <div className="container-fluid">
                                    <i className="bi bi-chevron-compact-left fs-2" onClick={()=>{Navigate(-1)}} style={{cursor :"pointer"}}></i>
                                        <a className="navbar-brand" href="#"> User Details</a>
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse " id="navbarNavDropdown">
                                            <ul className=" navbar-nav ms-auto">
                                                <li className="nav-item">
                                                    <a className="nav-link active" aria-current="page" href="#">Ban</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                                
                                <div className="row">
                                    <div className="column-1 bg-light" >
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`UserName: ${user.fullName}`} />
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Phone: ${user.phone}`} />
                                        <textarea type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Description: ${user.description}`} />
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Email: ${user.email}`} />
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Cash App/Venmo: ${user.cashAppId}`} />
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Website: ${user.website}`} />
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Location: ${user.city},${user.state}`} />
                                        <input type="text" className="form-control mt-3" disabled style={{ height: "55px" }} placeholder={`Device Type: ${user.deviceType}`} />
                                    </div>
                                    <div className="column-2 bg-light" >
                                        <div className="listing-column">
                                            <h3>Listings</h3>



                                            {listings.length==0 && <p className="">no Record</p>}
                                            {listings.map(i => (
                                                <Link to={`/users/listing/${i._id}`} style={{ textDecoration: "none" }}>
                                                    <div className="card mb-3" >
                                                       
                                                          
                                                            

                                                            <div className="row g-0">
                                                                <div className="col-md-4">
                                                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                                                    <div class="carousel-inner">
                                                                        <div class="carousel-item active">
                                                                            <img src={i.listingPhotos} class="d-block w-100" alt="..." style={{width :"200px",height :"200px"}}/>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span class="visually-hidden">Previous</span>
                                                                    </button>
                                                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                        <span class="visually-hidden">Next</span>
                                                                    </button>
                                                                </div>
                                                                </div>


                                                                <div className="col-md-8" >
                                                                    <div className="card-body" >
                                                                        <h5 className="card-title" >{i.title}</h5>
                                                                        <span className="card-text">{i.location}</span>

                                                                    </div>
                                                                </div>
                                                                <div className="ms-1">
                                                                    <span className="card-text"><small className="text-muted">{i.budget}</small></span>
                                                                    <br />
                                                                    <span className="card-text"><small className="text-muted">{i.location}</small></span>
                                                                </div>
                                                            </div>

                                                        
                                                    </div>
                                                </Link>
                                            ))}






                                        </div>
                                        <div className="request-column">
                                            <h3>Request</h3>
                                            {request.map(i => (


                                                <Link to={`/users/request/${i._id}`} style={{ textDecoration: "none" }}>
                                                    <div className="card mb-3" >
                                                        <div className="row g-0">
                                                            <div className="col-md-4">
                                                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                                                    <div class="carousel-inner">
                                                                        <div class="carousel-item active">
                                                                            <img src={i.listingPhotos} class="d-block w-100" alt="..." style={{width :"200px",height :"200px"}}/>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span class="visually-hidden">Previous</span>
                                                                    </button>
                                                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                        <span class="visually-hidden">Next</span>
                                                                    </button>
                                                                </div>
                                                            </div>


                                                            <div className="col-md-8">
                                                                <div className="card-body">
                                                                    <h5 className="card-title" >{i.title}</h5>
                                                                    <span className="card-text">{i.description}</span>

                                                                </div>
                                                            </div>
                                                            <div className="ms-1">
                                                                <span className="card-text"><small className="text-muted">{i.budget}</small></span>
                                                                <br />
                                                                <span className="card-text"><small className="text-muted">{i.location}</small></span>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default MoreDetails;