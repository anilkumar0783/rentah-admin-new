import Side from '../Partials/Side';
import Select from 'react-select';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRequest() {
    const [category, setCategory] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState(null);
    const [rentalPeriod, setRentalPeriod] = useState("");
    const [listingPhotos, setListingPhotos] = useState([]);
    const [type, setType] = useState(null);
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("26.907524");
    const [longitude, setLongitude] = useState("75.739639");
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    const createdBy = localStorage.getItem("adminId");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://24.199.104.72/api/categories/details`, {
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => res.json())
            .then(response => {
                if (response.status === true) {
                    setCategory(response.data);
                }
            });
    }, [token]);

    function handleCategory(e) {
        if (e.target.value === "0") {
            category.forEach(i => {
                if (i.categoryName === "Goods") {
                    setCategory(0);
                    setSubCategoryData(i.subCategories);
                }
            });
        } else if (e.target.value === "1") {
            category.forEach(i => {
                if (i.categoryName === "Services") {
                    setCategory(1);
                    setSubCategoryData(i.subCategories);
                }
            });
        } else if (e.target.value === "2") {
            category.forEach(i => {
                if (i.categoryName === "Spaces") {
                    setCategory(1);
                    setSubCategoryData(i.subCategories);
                }
            });
        }
    }

    function handleCheckBox(e) {
        const { value, checked } = e.target;
        if (checked) {
            setSubCategory((prevCheckedItems) => [...prevCheckedItems, value]);
        } else {
            setSubCategory((prevCheckedItems) =>
                prevCheckedItems.filter((item) => item !== value)
            );
        }
    }

    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`newImages`, file);
        });
        fetch(`http://24.199.104.72/api/upload-multiple-images`, {
            method: "POST",
            body: formData
        }).then((res) => res.json())
            .then(response => {
                setListingPhotos(response.images);
            });
    }

    function handleRemove(e, img) {
        const filteredPhotos = listingPhotos.filter(i => i !== img);
        setListingPhotos(filteredPhotos);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!category.length) return toast.error("Category is required");
        if (!subCategory.length) return toast.error('At least one sub-category is required')
        if (!title) return toast.error("title required");
        if(!description.length)return toast.error("description is required");
        if(type===0) return toast.error("type required");
        if(!budget) return toast.error("budget required");
        if(!location) return toast.error("please provide a perticular location");
        if(!rentalPeriod) return toast.error("select a time period to rent");


        const formData = { category, subCategory, title, description, type, budget, userId, location, longitude, latitude, createdBy };

        fetch(`http://24.199.104.72/api/user-requests/create`, {
            method: "POST",
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then((res) => res.json())
            .then(response => {
                if (response.status === true) {
                    toast.success(response.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                } else {
                    toast.error(response.message);
                }
            });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Side />
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>
                        <ToastContainer />
                        <i className="bi bi-chevron-compact-left fs-2 mt-2" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}></i>
                        <a className="navbar-brand text-dark fs-2 mt-2" href="#">Add Requests </a>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-6 mt-5'>
                                <form method='post' onSubmit={handleSubmit}>
                                    <br />
                                    <br />
                                    <label className='form-lable'>Category:</label>
                                    <select className='form-select' onChange={handleCategory}>
                                        <option selected>Select Category</option>
                                        <option value="0">Goods</option>
                                        <option value="1">Service</option>
                                        <option value="2">Space</option>
                                    </select>

                                    <label className='form-label mt-3'>Sub Categories:</label>
                                    <br />
                                    {subCategoryData.map(i => (
                                        <div className="form-check float-start ms-2 mb-3" key={i.subCategoryName}>
                                            <input className="form-check-input" type="checkbox" checked={subCategory.includes(i.subCategoryName)} value={i.subCategoryName} onChange={handleCheckBox} />
                                            <label className="form-check-label">
                                                {i.subCategoryName}
                                            </label>
                                        </div>
                                    ))}
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <label className='form-lable mt-3'>Listing Photos:</label>
                                    <input type='file' className='form-control' placeholder='Profile Picture'
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                    <div className="images">
                                        {listingPhotos?.map(i => (
                                            <div key={i} style={{ display: "inline-block", marginTop: "10px" }}>
                                                <img src={i} style={{ width: "70px", height: "50px" }} alt="listing" /><i onClick={(e) => handleRemove(e, i)} style={{ position: "relative", bottom: "23px", left: "-12px", cursor: "pointer", color: "green" }} className="bi bi-x-circle-fill"></i>
                                            </div>
                                        ))}
                                    </div>
                                    <input type='text' className='form-control mt-3' placeholder='Title'
                                        value={title} onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <textarea className='form-control mt-3' placeholder='Description'
                                        value={description} onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </textarea>

                                    <label className='form-lable mt-3'>Type:</label>
                                    <select className='form-select mt-2' onChange={(e) => setType(e.target.value)}>
                                        <option selected>Select Type</option>
                                        <option value="0">Day</option>
                                        <option value="1">Week</option>
                                        <option value="2">Month</option>
                                        <option value="3">For Sell</option>
                                    </select>
                                    <input type='number' className='form-control mt-3' placeholder='Budget'
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                    <input type='text' className='form-control mt-3' placeholder='Location'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    <input type='number' className='form-control mt-3' placeholder='Rental Period'
                                        value={rentalPeriod}
                                        onChange={(e) => setRentalPeriod(e.target.value)}
                                    />
                                    <button className='btn btn-success mb-5 mt-3 form-control' type='submit'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddRequest;
