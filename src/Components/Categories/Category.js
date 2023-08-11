import Side from "../Partials/Side";
import { useEffect, useState } from "react";
//import Side from "../Partials/Side";
import { Link, json } from "react-router-dom";
import { Bars } from 'react-loader-spinner'
import { toast } from "react-toastify";
function Category() {
    const [category, setCategory] = useState([])
    const [loaded, setLoaded] = useState(false)
    const token = localStorage.getItem('token')
    const [categoryName,setCategoryName]=useState("")
    const [categoryId,setCategoryId]=useState("")
    const [SubCategoryId,setSubCategoryId]=useState("")
    const [subCategoryName,setsubCategoryName]=useState("")
    const [imageURL,setCatImage]=useState("")
    useEffect(() => {
        fetch(`http://24.199.104.72/api/categories/details`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status === true) {
                    setCategory(response.data)
                    setLoaded(true)
                    console.log(response.data)
                    //alert("yess")
                }
            })
    }, [])

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
    setCatImage(response.imageUrl)
    })
    }

    function handleAdd(e,categoryId,name){
        let formData ={categoryId,subCategoryName,imageURL}
        setsubCategoryName("")
        setCatImage("")
       setCategoryName(name)
       setCategoryId(categoryId)
    //    fetch(`http://24.199.104.72/api/sub-categories/create`,{
    //       method :"POST",
    //       headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    //       body :JSON.stringify(formData)
    //    }).then((res)=>{return res.json()})
    //    .then(response=>{
    //     if(response.status===true){

    //     }
    //    })
    }

    function handleSubmit(e){
        e.preventDefault()
        let formData ={categoryId,subCategoryName,imageURL}
    //    setCategoryName(name)
    //    setCategoryId(categoryId)
       fetch(`http://24.199.104.72/api/sub-categories/create`,{
          method :"POST",
          headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
          body :JSON.stringify(formData)
       }).then((res)=>{return res.json()})
       .then(response=>{
        if(response.status===true){
          
            toast.success(response.message)
            setTimeout(() => {
                // navigate('/banner')
                window.location.reload();
            }, 700);
           
        }else{
            toast.error(response.message)
        }
       })
    }

    function handleDeleteSub(e,subcategoryId){
        const confirmsg=  window.confirm("Are You Sure To Delete")
        if(confirmsg==true){
     fetch(`http://24.199.104.72/api/sub-categories/${subcategoryId}`,{
        method :"DELETE",
        headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
     }).then((res)=>{return res.json()})
     .then(response=>{
        if(response.status===true){
         
          
            toast.success(response.message)
            setTimeout(() => {
                // navigate('/banner')
                window.location.reload();
            }, 700);
        }else{
            toast.error(response.message)
        }
     })
    }
    }

    function handleEditSub(e,subcategoryId,name,image){
      setsubCategoryName(name)
      setCatImage(image)
      setSubCategoryId(subcategoryId)
    }

    function handleSubmitEditSubCategory(e){
        e.preventDefault()
        let formData ={subCategoryName,imageURL}
        fetch(`http://24.199.104.72/api/sub-categories/${SubCategoryId}/edit`,{
            method :"POST",
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
            body :JSON.stringify(formData)
        }).then((res)=>{return res.json()})
        .then(response2=>{
            if(response2.status===true){
                toast.success(response2.message)
                setTimeout(() => {
                    // navigate('/banner')
                    window.location.reload();
                }, 700); 
            }else{
                toast.error(response2.message)
            }
        })
    }
    return (
        <>
            <div className="container-fluid" >
                <div className="row">
                    <Side />
                    <div className='col-md-2'></div>
                    <div className='col-md-10' style={{ overflow: "hidden" }}>
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
                            <div style={{ overflow: "hidden" }}>
                                {/* <div>
                                    <button className="btn btn-success mt-5 ms-5" style={{ background: "#179778" }}>Add New +</button>
                                </div> */}
                                <h2 className="text-center mt-5">Sub Categories</h2>
                                <div style={{ overflow: "hidden" }}>
                                    {category.map(i => (

                                        <ul class="list-group" style={{ overflow: "auto" }}>
                                            <li class="list-group-item active mt-3 bg-dark " aria-current="true">{i.categoryName}
                                             <button className="btn float-end text-light" data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{ background: "#179778" }} 
                                             onClick={(e)=>{handleAdd(e,i._id,i.categoryName)}}
                                             >
                                                Add New+</button></li>
                                            {i.subCategories?.map(j => (
                                                <>
                                                    <li class="list-group-item">{j.subCategoryName}
                                                        <Link className=" float-end fs-5 text-danger" onClick={(e)=>{handleDeleteSub(e,j._id)}}><i class="bi bi-trash3"></i></Link>
                                                        <Link className="me-5 fs-5 float-end text-success" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={(e)=>{handleEditSub(e,j._id,j.subCategoryName,j.imageURL)}}><i class="bi bi-pencil-fill"></i></Link>
                                                    </li>
                                                </>

                                            ))}

                                        </ul>

                                    ))}
                                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Add New Sub Category ({categoryName})</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form method="post" onSubmit={(e)=>{handleSubmit(e)}} >
                                                <div class="modal-body">
                                                    <label className="form-lable">Sub Category Name</label>
                                                    <input type="text" className="form-control"
                                                    value={subCategoryName}
                                                    onChange={(e)=>{setsubCategoryName(e.target.value)}}
                                                    />


                                                    <label className="form-label">Upload Image</label>
                                                    <input type="file" className="form-control"
                                                    onChange={handleImg}
                                                    />
                                                    <img src={imageURL} alt="" style={{ width: "200px", borderRadius: "12px", marginTop: "20px" }} />
                                                </div>
                                                <div class="modal-footer">
                                                    {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Edit Sub Category</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form method="post" onSubmit={(e)=>{handleSubmitEditSubCategory(e)}} >
                                                <div class="modal-body">
                                                    <label className="form-lable">Sub Category Name</label>
                                                    <input type="text" className="form-control"
                                                    value={subCategoryName}
                                                    onChange={(e)=>{setsubCategoryName(e.target.value)}}
                                                    />


                                                    <label className="form-label">Upload Image</label>
                                                    <input type="file" className="form-control"
                                                    onChange={handleImg}
                                                    />
                                                    <img src={imageURL} alt="" style={{ width: "200px", borderRadius: "12px", marginTop: "20px" }} />
                                                </div>
                                                <div class="modal-footer">
                                                    {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </>

    );
}

export default Category;