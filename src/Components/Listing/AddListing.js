import Side from '../Partials/Side'
import Select from 'react-select';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
function AddListing() {
  const [category, setCategory] = useState([])
  const [subCategoryData, setSubCategoryData] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const[bookingLink,setBookingLink]=useState("");
  const [budget, setBudget] = useState(null)
  const [tags, setTags] = useState([])
  const [listingPhotos, setListingPhotos] = useState([])
  const [singlePhoto,setSinglePhoto]=useState("")
  const [listingType, setListingType] = useState(null)
  const [type, setType] = useState(null)
  const [sigleTag, setSingleTag] = useState("")
  const [location, setLocation] = useState("")
  const [latitude,setLatitude]=useState("")
  const [longitude,setLongitude]=useState("")
 const createdBy =localStorage.getItem("adminId")
  // const [loaded, setLoaded] = useState(false)
  const  {userId}  = useParams()
  const token = localStorage.getItem('token')
  useEffect(() => {
    fetch(`http://24.199.104.72/api/categories/details`, {
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
    }).then((res) => { return res.json() })
      .then(response => {
        if (response.status === true) {
          setCategory(response.data)
          // setLoaded(true)
          console.log(response.data)
          //alert("yess")
        }
      })
  }, [])


  function handleCategory(e) {
    if (e.target.value === "0") {
      category.map(i => {
        if (i.categoryName === "Goods") {
          // subCategory.push(i.subCategories)
          setCategory("Goods")
          setSubCategoryData(i.subCategories)
        }
      })
    } if (e.target.value === "1") {
      category.map(i => {
        if (i.categoryName === "Services") {
          // subCategory.push(i.subCategories)
          setCategory("Services")
          setSubCategoryData(i.subCategories)
        }
      })
    }
    if (e.target.value === "2") {
      category.map(i => {
        if (i.categoryName === "Spaces") {
          // subCategory.push(i.subCategories)
          setCategory("Spaces")
          setSubCategoryData(i.subCategories)
        }
      })
    }
  }

  function handleCheckBox(e) {
    const { value, checked } = e.target
    if (checked) {
      setSubCategory((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setSubCategory((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  }
  const formData = new FormData();
  function fileChangeXl(e){
    const files = Array.from(e.target.files);
    // setPhotos(Array.from(e.target.files));
    console.log(e.target.files)
    files.forEach((file, index) => {
      formData.append(`listing_excel`, file);
    });
  }


function handlebulkSubmit(e){
  e.preventDefault()
    fetch(`http://24.199.104.72/api/listings/import-excel`, {
      method: "POST",
      headers: { Authorization: `bearer ${token}`},
      body: formData
    }).then((res) => { return res.json() })
      .then(response => {
        // setListingPhotos(response.images)
        console.log(response)
        if(response.status===true){
          toast.success(response.message)
        }else{
          toast.error(response.message)
        }
      })
}

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    // setPhotos(Array.from(e.target.files));
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`newImages`, file);
    });
    fetch(`http://24.199.104.72/api/upload-multiple-images`, {
      method: "POST",
      body: formData
    }).then((res) => { return res.json() })
      .then(response => {
        setListingPhotos(prev => [...prev, ...response.images])
        console.log(response)
      })
  }
  function handleRemove(img) {
    setListingPhotos(prev => prev.filter(i => i !== img));
  }

  function handleLanguageAdd(e) {
    tags.push(sigleTag)
    setSingleTag("")
  }

  
  function handleImageAddURL() {
    setListingPhotos(prev => [...prev, singlePhoto]);
    setSinglePhoto("");
  }

  function handleRemoveLanguage(e, lng) {
    const filterddeps = tags.filter(i => {
      return i !== lng
    })
    setTags(filterddeps)
  }

function handleFindLocation(e){
  const apiKey = 'AIzaSyCBOSXzH5COCV1vK-Zlau9oQwbt3sPawao'; 
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(e.target.value)}&key=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then( data => {
       console.log(data)
     if(data.status==="OK"){
      setLatitude(pre=>pre=data.results[0].geometry.location.lat);
      setLongitude(data.results[0].geometry.location.lng);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
   
     }
   
    })
}

  function handleSubmit(e) {
   
// Construct the API URL

  
  console.log(latitude,longitude)
    e.preventDefault()
     if(listingType===null){
      toast.error("Select list type")
     } else if(category.length===0){
      toast.error("Select Catgeory ")
     } else if(subCategory.length===0){
      toast.error("Select sub-Catgeory ")
     }else if(listingPhotos.length===0){
      toast.error("Select List Images")
     }else if(title===""){
      toast.error("Enter List Title")
     }else if(description===""){
      toast.error("Enter List Description")
     }else if(type===null){
      toast.error("Select List Type")
     }else if(budget===null){
      toast.error("Enter List Budget")
     }else if(location===""){
      toast.error("Enter List Location")
     }else if(latitude==="" || longitude===""){
      toast.error("Enter Valid Location")
     }
     else{

    
    const formData = { listingType, category, subCategory,listingPhotos, title, description,bookingLink, type, budget, userId,location,longitude,latitude,tags,createdBy }
    console.log(formData)
    fetch(`http://24.199.104.72/api/listings/create`, {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).then((res) => { return res.json() })
    .then(response=>{
      if(response.status===true){
        toast.success(response.message)
        setTimeout(() => {
          // navigate('/business-user')
          window.location.reload();
      }, 700);
      }
    })
  }
  }
  let navigate = useNavigate()
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className='col-md-2'></div>
          <div className='col-md-10'>
            <ToastContainer />
            <i className="bi bi-chevron-compact-left fs-2 mt-2" onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}></i>
            <a className="navbar-brand text-dark fs-2 mt-2" href="#">Add Listing </a>
            {/* <button style={{border:"none",outline:"none",padding:"8px",background:"#179778"}}>Add Business User+</button> */}
            <div className='row'>
              <div className='col-md-2'>
                {/* <p>s</p> */}
              </div>
              
              <div className='col-md-6 mt-5'>
                <form >

                  <label className='form-label'>Listing Type</label>
                  <br />
                  <div class="form-check float-start ">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="0" onChange={(e) => { setListingType(e.target.value) }} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Rent
                    </label>

                  </div>
                  <div class="form-check float-start ms-3 mb-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1" onChange={(e) => { setListingType(e.target.value) }} />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Sell
                    </label>

                  </div>
                  <br />
                  <br />
                  <label className='form-lable'>Category:</label>
                  <select className='form-select' onChange={(e) => { handleCategory(e) }}>
                    <option selected>Select Category</option>
                    <option value="0">Goods</option>
                    <option value="1">Service</option>
                    <option value="2">Space</option>
                  </select>

                  <label className='form-label mt-3'>Sub Categories:</label>
                  <br />
                  {subCategoryData.map(i => (
                    <div class="form-check float-start ms-2 mb-3">
                      <input class="form-check-input" type="checkbox" checked={subCategory.includes(i.subCategoryName)} value={i.subCategoryName} onChange={handleCheckBox} />
                      <label class="form-check-label">
                        {i.subCategoryName}
                      </label>

                    </div>
                  ))}
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <label className='form-lable   mt-4'>Listing Photos:</label>

                  <input type='file' className='form-control ' placeholder='Profile Picture'
                    //  onChange={handleImg}
                    multiple
                    onChange={handleFileChange}
                  />
                        <h4 className='text-center mt-3'>OR</h4>
                  <input type='text' className='form-control mt-3' placeholder='Listing Photos Url'
                    value={singlePhoto}
                    onChange={(e) => { setSinglePhoto(e.target.value) }}
                  />
                
                  {singlePhoto !== "" && <h6 onClick={handleImageAddURL} style={{ position: "relative", top: "-30px", left: "570px", color: "#02BBB7", cursor: "pointer",background:"white" }}>Add</h6>}

                  
                  <div className="images">
                    {listingPhotos.map((i,index) => (
                      <div style={{ display: "inline-block", marginTop: "10px" }}>
                        <img src={i} style={{ width: "70px", height: "50px" }} /><i onClick={()=>handleRemove(i)} style={{ position: "relative", bottom: "23px", left: "-12px", cursor: "pointer", color: "green" }} class="bi bi-x-circle-fill"></i>
                      </div>
                    ))}


                  </div>
                  

                  <input type='text' className='form-control mt-3' placeholder='Title'
                    value={title} onChange={(e) => { setTitle(e.target.value) }}
                  />

                  <textarea className='form-control mt-3' placeholder='Description'
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                  >
                  </textarea>
                  
                  <input type='text' className='form-control mt-3' placeholder='Booking Link'
                  value={bookingLink} onChange={(e)=>{setBookingLink(e.target.value)}}
                  />

                  <label className='form-lable mt-3'>Type:</label>
                  <select className='form-select mt-2' onChange={(e) => { setType(e.target.value) }}>
                    <option selected>Select Type</option>
                    <option value="4">Hour</option>
                    <option value="0">Day</option>
                    <option value="1">Week</option>
                    <option value="6">Year</option>
                    <option value="2">Month</option>
                    <option value="3">For Sell</option>
                    <option value="5">Custom</option>
                  </select>
                  <input type='number' className='form-control mt-3' placeholder='Price'
                    value={budget}
                    onChange={(e) => { setBudget(e.target.value) }}
                  />
  
                  <input type='text' className='form-control mt-3' placeholder='Tags'
                    value={sigleTag}
                    onChange={(e) => { setSingleTag(e.target.value) }}
                  />
                  {sigleTag !== "" && <h6 onClick={handleLanguageAdd} style={{ position: "relative", top: "-30px", left: "570px", color: "#02BBB7", cursor: "pointer" }}>Add</h6>}

                  {tags.map(i => (
                    <>
                      <span class="badge  mt-2   pt-2 pb-2 ms-2" style={{ borderRadius: "15px", cursor: "pointer", background: "#02BBB7", border: "1px solid #02BBB7", color: "white" }}>{i}</span>
                      <i onClick={(e) => { handleRemoveLanguage(e, i) }} style={{ position: "relative", bottom: "8px", left: "-10px", cursor: "pointer", color: "black" }} class="bi bi-x-circle-fill"></i>
                    </>
                  ))}



                  <input type='text' className='form-control mt-3' placeholder='Location'
                    value={location}
                    onChange={(e) => { setLocation(e.target.value) ; handleFindLocation(e)}}
                  />






                  {/* <h1>{selectedCountry?.value}{phone}</h1> */}
                </form>
                <button className='btn btn-success mb-5 mt-3 form-control' onClick={handleSubmit}>Submit</button>
                {/* <p>{latitude},{longitude}</p> */}
                <h2 className='text-center'>OR</h2>
                <form method='post' onSubmit={(e)=>{handlebulkSubmit(e)}}>
                  <label className='form-label'>Upload Bulk Listing:</label>
                  <input type='file' className='form-control' onChange={fileChangeXl}/>
                  <button type='submit' className='btn btn-success form-control mt-3 mb-5'>Upload</button>
                </form>
              </div>
            </div>
           
          </div>

        </div>
      </div>
    </>
  );
}

export default AddListing;