import { useEffect, useState } from "react";

function EditListingForm(props) {
  const [listId, setListId] = useState("");
  const [listingType, setListingType] = useState("");
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [listingPhotos, setListingPhotos] = useState([]);
  const [singlePhoto, setSinglePhoto] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[bookingLink,setBookingLink]=useState("");
  const [type, setType] = useState(null);
  const [budget, setBudget] = useState("");
  const [tags, setTags] = useState([]);
  const [singleTags, setSingleTags] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    setListId(props.list._id);
    setListingType(props.list.listingType);
    setCategory(props.list.category);
    setSubCategory(props.list.subCategory);
    setListingPhotos(props.list.listingPhotos);
    setTitle(props.list.title);
    setDescription(props.list.description);
    setBookingLink(props.list.bookingLink);
    setType(props.list.type);
    setBudget(props.list.budget);
    setLatitude(props.list.latitude);
    setLongitude(props.list.longitude);
    setLocation(props.list.location);
    setTags(props.list.tags);
  }, [props]);
  const token = localStorage.getItem('token')
  useEffect(() => {
    fetch(`http://24.199.104.72/api/categories/details`, {
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
    }).then((res) => { return res.json() })
      .then(response => {
        if (response.status === true) {
          setCategoryData(response.data)
          // setLoaded(true)
          console.log(response.data)
          //alert("yess")
        }
      })
  }, [])
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
        setListingPhotos([...listingPhotos, ...response.images])
        console.log(response)
      })
  }

  function handleRemove(e, img) {
    const filterdPhotos = listingPhotos.filter(i => {
      return i !== img
    })
    setListingPhotos(filterdPhotos)
  }



  function handleSubmit(e) {


    e.preventDefault()
    const formData = { listingType, category, subCategory, listingPhotos, title, description,bookingLink, type, budget, location, longitude, latitude, tags }
    console.log(formData)
    fetch(`http://24.199.104.72/api/listings/${listId}/edit`, {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).then((res) => { return res.json() })
      .then(response => {
        if (response.status === true) {
          // toast.success(response.message)
          setTimeout(() => {
            // navigate('/business-user')
            window.location.reload();
          }, 700);
        }
      })
  }
  return (
    <>


      <form method="post" onSubmit={(e) => { handleSubmit(e) }}>
        <label>List Title*</label>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="mt-2">List Description*</label>
        <textarea className='form-control mt-3'
          value={description} onChange={(e) => { setDescription(e.target.value) }}
        >
        </textarea>
<label className="mt-2">Booking Link*</label>
        <input
          className="form-control mt-2"
          type="text"
          value={bookingLink}
          onChange={(e) => {
            setBookingLink(e.target.value);
          }}
        />
        <label className="mt-2">List Price*</label>
        <input
          className="form-control"
          type="text"
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
          }}
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
                    <option vlaue="5">Custom</option>
                  </select>
                


        <label className="mt-2">List Category*</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (e.target.value === "0") {
              categoryData.map(i => {
                if (i.categoryName === "Goods") {
                  // subCategory.push(i.subCategories)
                  // setCategory("Goods")
                  // setSearch("Goods")
                  setSubCategoryData(i.subCategories)
                }
              })
            } if (e.target.value === "1") {
              categoryData.map(i => {
                if (i.categoryName === "Services") {
                  // subCategory.push(i.subCategories)
                  // setCategory("Services")
                  // setSearch("Services")
                  setSubCategoryData(i.subCategories)
                }
              })
            }
            if (e.target.value === "2") {
              categoryData.map(i => {
                if (i.categoryName === "Spaces") {
                  // subCategory.push(i.subCategories)
                  // setCategory("Spaces")
                  // setSearch("Spaces")
                  setSubCategoryData(i.subCategories)
                }
              })
            }
          }}
        >
          <option>Select Category</option>
          <option value="0">Goods</option>
          <option value="1">Service</option>
          <option value="2">Spaces</option>
        </select>

        <label className="mt-2">List Sub Category*</label>
        <select
          className="form-select"
          onChange={(e) => {
            setSubCategory([...subCategory, e.target.value]);
          }}
        >
          <option>Select Sub Category</option>
          {subCategoryData.map((i) => (
            <option value={i.subCategoryName}>{i.subCategoryName}</option>
          ))}
        </select>
        <div className="d-flex mt-2">
          {subCategory?.map((i) => (
            <div className="d-flex">
              <div
                class="badge rounded-pill ms-1 ps-3 pe-3 pt-2 pb-2 mt-3 "
                style={{ background: "#179778" }}

              >
                {i}

              </div>
              <div style={{ position: "relative", right: "16px", marginTop: "2px", cursor: "pointer" }}
                onClick={() => {

                  setSubCategory(subCategory.filter(j => {
                    return j !== i
                  })
                  )


                }}
              >
                <i class="bi bi-x fs-4"></i>
              </div>
            </div>
          ))}
        </div>
        <label className="mt-2">Select Photos*</label>
        <input className="form-control" type="file"
          multiple
          onChange={handleFileChange}
        />
        <label className="mt-2">List Photos*</label>
        <br />
        <br />
        <div className="d-flex  gap-2">
          {listingPhotos?.map((i) => (
            <div className="d-flex" >
              <span
                className=""
                style={{
                  position: "relative",
                  left: "112px",
                  bottom: "18px",
                  cursor: "pointer",
                }}
                onClick={(e) => { handleRemove(e, i) }}
              >
                <i class="bi bi-x fs-4"></i>
              </span>
              <img src={i} style={{ width: "100px", height: "80px" }} />
            </div>
          ))}
        </div>
        <br />

        <label className="mt-5">List Tags*</label>
        <input
          className="form-control"
          type="text"
          value={singleTags}
          onChange={(e) => {
            setSingleTags(e.target.value);
          }}
        />
        <div
          className="text-success"
          style={{
            position: "absolute",
            right: "20px",
            bottom: "-60px",
            cursor: "pointer",
          }}
          onClick={() => {
            if (singleTags !== "") {
              setTags([...tags, singleTags]);
              setSingleTags("")
            }
          }}
        >
          Add
        </div>
        <div className="d-inline-flex ">
          {tags?.map((i) => (
            <div className="d-flex">
              <div
                class="badge rounded-pill ms-1 ps-3 pe-3 pt-2 pb-2 mt-3 "
                style={{ background: "#179778" }}
              >
                {i}

              </div>
              <div style={{ position: "relative", right: "16px", marginTop: "2px", cursor: "pointer" }}
                onClick={() => {

                  setTags(tags.filter(j => {
                    return j !== i
                  })
                  )


                }}
              >

                <i class="bi bi-x fs-4"></i>
              </div>
            </div>
          ))}
        </div>

        <br />
        <label className="mt-2">List Latitude*</label>
        <input
          className="form-control"
          type="text"
          value={latitude}
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
        />
        <label className="mt-2">List Longitude*</label>
        <input
          className="form-control"
          type="text"
          value={longitude}
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
        />
        <label className="mt-2">List Location*</label>
        <input
          className="form-control"
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />

        <button className="btn btn-success form-control mt-5" type="submit">Submit</button>
      </form>



    </>
  );
}

export default EditListingForm;
