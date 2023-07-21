import { useNavigate, useParams } from "react-router-dom";
import Side from "../Partials/Side";
import { useEffect, useState } from "react";
import { Bars } from 'react-loader-spinner'
function SingleRequest() {
    const { userRequestId } = useParams()
    let Navigate = useNavigate()
    const [request, setRequest] = useState({})
    const [loaded, setLoaded] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch(`http://24.199.104.72/api/user-requests/${userRequestId}`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status == true) {
                    setLoaded(true)
                    setRequest(response.data)
                    
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
                            <i className="bi bi-chevron-compact-left fs-2" onClick={()=>{Navigate(-1)}} style={{cursor :"pointer"}}>GoBack</i>
                        <div className="listing-parent">
                            <div className="listing-col-1">
                                <h3>{request.title}</h3>
                                <h6 style={{ color: "grey" }}>{request.description}</h6>
                                <p>{request.category}/{request.subCategory}</p>
                                <h4>{request.budget}/-</h4>
                                <p>location</p>
                                <h4>Tags</h4>
                                {request.tags?.map(i => (
                                    <span class="badge rounded-pill  " style={{ background: "#179778" }}>{i}</span>
                                ))}
                            </div>
                            <div className="listing-col-2">
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {list.listingPhotos?.map(i=>(
                                            <div className="carousel-item active" style={{width :"400px"}}>
                                            <img src={i} className="d-block w-100" alt="..." />
                                        </div>
                                        ))}
                                        
                                        
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
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

export default SingleRequest;