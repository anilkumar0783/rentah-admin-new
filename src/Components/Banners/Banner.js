import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Partials/Navbar";
import Side from "../Partials/Side";
import { useEffect, useState } from "react";
import { Bars ,LineWave } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Banner() {
    let navigate= useNavigate()
    const token = localStorage.getItem('token')
    const [banner, setBanner] = useState([])
    const [singleBanner,setSingleBanner]=useState({})
    const [loaded, setLoaded] = useState(false)
    const [bannerName,setBannerName]=useState("")
    const [bannerImage,setBannerImage]=useState("")
    const [bannerURL,setBannerURL]=useState("")
    const [isActive,setIsActive]=useState(null)
    const [bannerId,setBannerId]=useState("")
    const [imageLoaded,setImageLoaded]=useState(1)
    useEffect(() => {
        fetch('http://24.199.104.72/api/banners', {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then((response) => {
                if (response.status === true) {
                    setBanner(response.banners)
                    setLoaded(true)
                    // console.log(seeker)
                }
            })
    }, [])

    function handleDelete(e,bannerId) {
      const confirmsg=  window.confirm("Are You Sure To Delete")
      if(confirmsg==true){
        fetch(`http://24.199.104.72/api/banners/${bannerId}`, {
            method :"DELETE",
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then((response) => {
                if (response.status === true) {
                    toast.success("banner Deleted successfully")
            setTimeout(()=>{
                    navigate('/banner')
                    window.location.reload();
                   }, 700);
                    // console.log(seeker)
                }
            })
      }

    }

    function hadleEdit ( e,bannerId) {
      const singleBanner=  banner.find(itm=>{
          return  itm._id==bannerId
        })
        setBannerImage(singleBanner.bannerImage)
        setBannerName(singleBanner.bannerName)
        setBannerURL(singleBanner.bannerURL)
        setIsActive(singleBanner.isActive)
        setBannerId(singleBanner._id)
    }

    function  handleImg(e){
        //setFileList(e.target.files)
            
        const formData = new FormData();
        
        formData.append('newImage',e.target.files[0])
        
       // console.log(fileList)
    fetch(`http://24.199.104.72/api/upload-single-image`,{
    method :"POST",
    //  headers :{"Content-Type":"application/json" },
    body :formData
    }).then((res)=>{return res.json()})
    .then(response=>{
    setBannerImage(response.imageUrl)
    })
    }
    function handleSubmit(e,bannerId){
        e.preventDefault()
        let formData ={bannerName,bannerImage,bannerURL,isActive}
console.log(formData)
     fetch(`http://24.199.104.72/api/banners/${bannerId}`,{
        method :"PATCH",
        headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" },
        body : JSON.stringify(formData)
     }).then((res)=>{return res.json()})
     .then(response=>{
        if(response.status==true){
            toast.success("banner update successfully")
            setTimeout(()=>{
                    navigate('/banner')
                    window.location.reload();
                   }, 700);
        }else{
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
                            <ToastContainer/>
                                <div>
                                    <Link to='/banner/add-banner'><button className="btn btn-success mt-5 ms-5" style={{ background: "#179778" }}>Add New +</button></Link>
                                </div>
                                {banner.length == 0 && <h3 className="text-center">No Record Found !</h3>}
                                <div className="table-banner">
                                    <table className="table table-borderless text-center mt-5" >
                                        <tr style={{ background: "#F6F6F6", height: "50px" }}>
                                            <th>Sno.</th>
                                            <th>Banner Image</th>
                                            <th>URL</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                        {banner.map((i, key) => (

                                            <>
                                                <tr className="mt-3">
                                                    <td>{key + 1}</td>
                                                    <td><img src={i.bannerImage} style={{ width: "150px" }} /></td>
                                                    <td>{i.bannerURL}</td>
                                                    <td>{i.bannerName}</td>
                                                    <td><Link data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => { hadleEdit(e, i._id) }}><i className="bi bi-pencil-square"></i></Link> <Link onClick={(e) => { handleDelete(e,i._id) }}><i className="bi bi-trash text-danger"></i></Link></td>
                                                </tr>

                                            </>
                                        ))}
                                    </table>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <form onSubmit={(e)=>{handleSubmit(e,bannerId)}}>
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Edit Banner</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="mb-3">
                                                        <input className="form-control" type="file" id="formFileMultiple"
                                                            onChange={handleImg}
                                                        />
                                                        {bannerImage==""?
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
                                                      :
                                                      <img src={bannerImage} alt="" style={{ width: "200px", borderRadius: "12px", marginTop: "20px" }} />
                                                        }
                                                        
                                                        <input type="text" className="form-control mt-3" placeholder="Banner Name" value={bannerName} 
                                                        onChange={(e)=>{setBannerName(e.target.value)}}
                                                        />
                                                        <input type="text" className="form-control mt-3" placeholder="Banner Url" value={bannerURL}
                                                        onChange={(e)=>{setBannerURL(e.target.value)}}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                        </form>
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

export default Banner;