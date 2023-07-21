//import { useState } from "react";
import Side from "../Partials/Side";
import { useEffect, useState } from "react";
import { Bars, LineWave } from 'react-loader-spinner'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddBanner() {
    
    let navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [bannerName, setBannerName] = useState("")
    const [bannerImage, setBannerImage] = useState("")
    const [bannerURL, setBannerURL] = useState("")
    const [isActive, setIsActive] = useState(null)



    function handleImg(e) {
        //setFileList(e.target.files)

        const formData = new FormData();

        formData.append('newImage', e.target.files[0])

        // console.log(fileList)
        fetch(`http://24.199.104.72/api/upload-single-image`, {
            method: "POST",
            //  headers :{"Content-Type":"application/json" },
            body: formData
        }).then((res) => { return res.json() })
            .then(response => {
                setBannerImage(response.imageUrl)
            })
    }

    function handleSubmit(e, bannerId) {
        e.preventDefault()
        let formData = { bannerName, bannerImage, bannerURL, isActive }
        console.log(formData)
        fetch(`http://24.199.104.72/api/banners/create`, {
            method: "POST",
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status == true) {
                    toast.success("banner update successfully")
                    setTimeout(() => {
                        navigate('/banner')
                        window.location.reload();
                    }, 700);
                } else {
                    toast.error("somthing went wrong")
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
                        <h4 className=" mt-3">Add New Banner</h4>
                    <Link><i class="bi bi-arrow-left-short fs-1" onClick={()=>{navigate(-1)}}  style={{color :"green" ,width :"70px"}}></i></Link>
                        <div className="add-banner-div-1">
                            <div className="add-banner-div-2">
                                <form method="post" onSubmit={(e) => { handleSubmit(e) }}>
                                    <label className="form-label mt-3">Banner Name</label>
                                    <input className="form-control" type="text" value={bannerName}
                                        onChange={(e) => { setBannerName(e.target.value) }}
                                    />
                                    <label className="form-label mt-3">Banner URL</label>
                                    <input className="form-control" type="text"
                                        value={bannerURL}
                                        onChange={(e) => { setBannerURL(e.target.value) }}
                                    />
                                    <input className="form-control mt-5" type="file" id="formFileMultiple"
                                        onChange={handleImg}
                                    />
                                    {bannerImage == "" ?
                                        <p></p>
                                        :
                                        <img src={bannerImage} alt="" style={{ width: "200px", height: "100px", borderRadius: "12px", marginTop: "20px" }} />
                                    }

                                    <br />
                                    <label className="form-label mt-3">Banner Status</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { setIsActive(e.target.value) }}>
                                        <option selected>Open this select menu</option>
                                        <option value={0}>InActive</option>
                                        <option value={1}>Active</option>
                                    </select>
                                    <button type="submit" className="form-control mt-5 send-btn">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default AddBanner;