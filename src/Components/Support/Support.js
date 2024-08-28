import Side from "../Partials/Side";
import { useEffect, useState } from "react";
//import Side from "../Partials/Side";
import { Link } from "react-router-dom";
import { Bars } from 'react-loader-spinner'
function Support() {
    const [support, setSupport] = useState([])
    const [loaded, setLoaded] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch(`http://24.199.104.72/api/support-queries`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status === true) {
                    setSupport(response.data)
                    setLoaded(true)
                    //alert("yess")
                }
            })
    }, []) 
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Side />
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>
                        {loaded === false ?
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
                            <div>
                                <table className='table table-borderless text-center mt-5'>
                                    <thead className='mb-2'>
                                        <tr className='' style={{ background: "#F6F6F6", height : "50px" }}>
                                            <th>S No</th>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Query</th>
                                            <th>Posted On</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''> 
                                        {support.map((i, key) => (
                                            <>
                                                <tr className="mt-2" style={{ background: "#F0EBEB" }}>
                                                    <td>{key + 1}</td>
                                                    <td>{i.userName}</td>
                                                    <td><a href={`mailto:${i.email}`} target="_blank">{i.email}</a></td>
                                                    <td ><p className=" text-primary btn" data-bs-toggle="modal" data-bs-target="#exampleModal">View</p></td>
                                                    <td>{new Date(i.creationTimeStamp).getDate()}/{new Date(i.creationTimeStamp).getMonth()+1}/{new Date(i.creationTimeStamp).getFullYear()}</td>
                                                </tr>
                                                <br />
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">Query</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                               {i.description}
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
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