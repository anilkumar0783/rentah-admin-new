import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Partials/Navbar';
import Side from '../Partials/Side'
import { Bars, LineWave } from 'react-loader-spinner'
import { hover } from '@testing-library/user-event/dist/hover';


export default function AllListing() {
    const [data, setNewData] = useState([])
    const [users, setUsers] = useState([])
    const [currPage, setCurrPage] = useState(0)
    const [search, setSearch] = useState("")
    const [postPerPage, setPostPerPage] = useState(20)
    const [loaded, setLoaded] = useState(false)
    const token = localStorage.getItem('token')
    const [category, setCategory] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])
    const [subCategory, setSubCategory] = useState([])
    
    function handleSearch(e) {
    
        setSearch(e.target.value)
        setUsers([])
        setCurrPage(0)
      }
      useEffect(() => {
        fetch(`http://24.199.104.72/api/listings-admin?skip=${currPage}&limit=${postPerPage}&title=${search}`, {
          headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
          .then((response) => { 
            if (response.status === true) {
              console.log(response)
              if(search==="" && response.data.length>=20){
                
              let jsonData = response.data
               setUsers((prevData) => [...prevData, ...jsonData]);
              // users.push(jsonData)
              // setUsers(users)
              console.log(jsonData)
              setLoaded(true)
                }
               else if(search!=="" && response.data.length>=20){
                  let jsonData = response.data
              setUsers((prevData) => [...prevData, ...jsonData]);
              setLoaded(true)
               }else{
                  setUsers([])
                  setCurrPage(0)
                  setUsers(response.data)
                  setLoaded(true)
                }
              
              // console.log(seeker)
              //           window.addEventListener('scroll', handleScroll);
              // return () => {
              //   window.removeEventListener('scroll', handleScroll);
              // };
            }
          });
    
      }, [currPage,search])

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

      const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    };

      function handleCategory(e){
        if (e.target.value === "0") {
          category.map(i => {
            if (i.categoryName === "Goods") {
              // subCategory.push(i.subCategories)
              // setCategory("Goods")
              setSearch("Goods")
              setSubCategoryData(i.subCategories)
            }
          })
        } if (e.target.value === "1") {
          category.map(i => {
            if (i.categoryName === "Services") {
              // subCategory.push(i.subCategories)
              // setCategory("Services")
              setSearch("Services")
              setSubCategoryData(i.subCategories)
            }
          })
        }
        if (e.target.value === "2") {
          category.map(i => {
            if (i.categoryName === "Spaces") {
              // subCategory.push(i.subCategories)
              // setCategory("Spaces")
              setSearch("Spaces")
              setSubCategoryData(i.subCategories)
            }
          })
        }
      }

      function handleCategory2(e){
        setSearch(e.target.value)
      }

      const handleIntersection = (entries) => {
        const [entry] = entries;
        if(users.length>=20){
        if (entry.isIntersecting) {
          // The element is intersecting with the viewport, load more data
          setCurrPage(currPage+postPerPage);
        }
      }
      };
      useEffect(() => {
        const options = {
          root: null, // Use the viewport as the root
          rootMargin: '0px',
          threshold: 0.1, // Trigger the intersection callback when 10% of the target is visible
        };
    
        const observer = new IntersectionObserver(handleIntersection, options);
        const target = document.querySelector('#scroll-target'); // Change this selector to your target element
    
        if (target) {
          observer.observe(target);
        }
    
        return () => {
          if (target) {
            observer.unobserve(target);
          }
        };
      }, [users]);


      
    return ( 
        <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className='col-md-2'></div>
          <div className='col-md-10'>
            {/* <div>
                    <Link to="/users/add-user"><button className='btn mt-3' style={{background :"#179778"}}>Add User +</button></Link>
                </div> */}
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
                <div className='search-user'>
                  <input type='search' onChange={(e) => { handleSearch(e) }} className='mt-3 mb-3' placeholder='Search By Title or UserName' />
                 <select className='ms-2' style={{outline:"none",height:"50px",borderRadius :"6px"}} onChange={(e)=>{handleCategory(e)}}>
                    <option>Select Category</option>
                    <option value="0">Goods</option>
                    <option value="1">Service</option>
                    <option value="2">Spaces</option>
                  </select>
                  <select className='ms-2' style={{outline:"none",height:"50px",borderRadius :"6px"}} onChange={(e)=>{handleCategory2(e)}}>
                    {subCategoryData.map(i=>(
                      <option value={i.subCategoryName}>{i.subCategoryName}</option>
                    ))}
                    
                  </select>
                </div>
                <div className='table-banner'>
                  <table className='table table-borderless text-center mt-5 table-banner'>
                    <thead className='mb-2'>
                      <tr className='text-start' style={{ background: "#F6F6F6", height: "50px" }}>
                        <th>S No</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Username</th> 
                        <th>Category</th>
                        <th>Created ON</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody >
                      {users.map((i, key) => (
                        <>
                          <tr className="mt-2 text-start" style={{ background: "#F0EBEB" }}>
                            <td>{key + 1}</td>
                            {/* <td>{i._id}</td> */}
                            <td><img src={i.listingPhotos[0]} style={{width:"35px",height:"35px",borderRadius:"50%"}}/></td>
                            <td>{i.title}</td>
                            <td>{i.userName||"not found"}</td>
                            {i.category==0 && <td>Goods</td>}
                            {i.category==1 && <td>Service</td>}
                            {i.category==2 && <td>Space</td>}
                            {i.category.length>1 && <td>{i.category}</td>}
                            
                            <td>{`${new Date(i.creationTimeStamp).getDate()}/${new Date(i.creationTimeStamp).getMonth()+1}/${new Date(i.creationTimeStamp).getFullYear()}`}</td>
                            <td>{ i.location}</td>
                            {i.type==0 && <td>Day</td>}
                            {i.type==1 && <td>Week</td>}
                            {i.type==2 && <td>Month</td>}
                            {i.type==3 && <td>For Sale</td>}
                            {i.type==4 && <td>Hour</td>}
                            {i.type==5 && <td>Custom</td>}
                            {i.type==-1 &&  <td>-</td>}
                            <td><Link to={`/users/listing/${i._id}`} className='btn' style={{ background: "#D9D9D9", fontWeight: "bold" }}>View Details</Link></td>
                          </tr>
                          <br />
                        </>
                      ))}

                    </tbody>
                  </table>
                  {users.length>=10 &&
                  <div id="scroll-target" style={{ height: '2px',marginLeft: "46%" }}>
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
                  </div>
}
                </div>
                {/* <div className='btn-paging'>
              <button className='btn ms-3' style={{background :"grey"}} onClick={handlePrev}>PREV</button>
              </div>
              <div className='btn-paging'>
              <p className='pages ms-3 mt-1'>{currPage} of {totalPages}</p>
              </div>
              <div className='btn-paging'>
              <button className='btn ms-3 ' style={{background :"#179778"}} onClick={handleNext}>NEXT</button>
              </div> */}
              </>
            }
          </div>
        </div>
      </div>

    </>
     );
}