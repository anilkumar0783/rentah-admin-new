import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Partials/Navbar';
import Side from '../Partials/Side'
import { Bars, LineWave } from 'react-loader-spinner'
import { hover } from '@testing-library/user-event/dist/hover';
import { ToastContainer, toast } from "react-toastify";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';


function AllUsers() {
  let location = useLocation()
  const [data, setNewData] = useState([])
  const [users, setUsers] = useState([])
  const [currPage, setCurrPage] = useState(0)
  const [search, setSearch] = useState("")
  const [postPerPage, setPostPerPage] = useState(20)
  const [loaded, setLoaded] = useState(false)
  const token = localStorage.getItem('token')

  // useEffect(() => {
  //     handleSearch(e);
  //   }, [users, search])

  function handleSearch(e) {
    
    setSearch(e.target.value)
    setUsers([])
    setCurrPage(0)
  }


  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const page = searchParams.get('page');
  //   console.log(page)
  //   // setCurrPage(Number(page) || 1);
  // }, [location.search]);
  useEffect(() => {
    fetch(`http://24.199.104.72/api/users?skip=${currPage}&limit=${postPerPage}&fullName=${search}`, {
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
    }).then((res) => { return res.json() })
      .then((response) => { 
        if (response.status === true) {
          if(search==="" && response.users.length>=20){
            
          let jsonData = response.users
           setUsers((prevData) => [...prevData, ...jsonData]);
          // users.push(jsonData)
          // setUsers(users)
          console.log(jsonData)
          setLoaded(true)
            }
           else if(search!=="" && response.users.length>=20){
              let jsonData = response.users
          setUsers((prevData) => [...prevData, ...jsonData]);
          setLoaded(true)
           }else{
              setUsers([])
              setCurrPage(0)
              setUsers(response.users)
              setLoaded(true)
            }
          
          // console.log(seeker)
          //           window.addEventListener('scroll', handleScroll);
          // return () => {
          //   window.removeEventListener('scroll', handleScroll);
          // };
        }
      })

  }, [currPage,search])


  // const handleScroll = () => {
  //     // Check if the user has reached the bottom of the page
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       // Increment the page state to load more data
  //       setCurrPage(currPage+ 1);
  //     }
  //   };

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

  //  function componentWillUnmount() {
  //     // Remove the event listener when the component unmounts to prevent memory leaks
  //     window.removeEventListener("scroll", handleScroll());
  //   }
  // async function handleNext(){
  //     // if(totalPages>currPage){
  //         setCurrPage(currPage+1)
  //         setLoaded(false)
  //     //    alert(currPage+1)
  //             fetch(`http://24.199.104.72/api/users?skip=${currPage+1}&limit=${postPerPage+(postPerPage*currPage)}`,{
  //             headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
  //         }).then((res)=>{return res.json()})
  //         .then((response)=>{
  //             if(response.status===true){
  //                 setUsers(response.users)
  //                 setLoaded(true)
  //                 // console.log(seeker)
  //             }
  //         })

  //     // }

  //  }

  // useEffect(()=>{
  //     const lastPostIndex= currPage * postPerPage;
  //     const firstPostIndex= lastPostIndex - postPerPage;

  //         setNewData(users.slice(firstPostIndex,lastPostIndex))
  //     },[data])
  //     let totalPages= Math.ceil((users.length)/postPerPage)
  //     function handlePrev(){
  //         if(currPage>=2){
  //      setCurrPage(currPage-1)
  //         }
  //      }


  function handleDeleteUser(e,userId){
    const userRes=  window.confirm("Are you sure to delete this user?")
        if(userRes===true){
          fetch(`http://24.199.104.72/api/users/${userId}`, {
            method:"DELETE",
            headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" }
        }).then((res) => { return res.json() })
            .then(response => {
                if (response.status == true) {
                  
                  
                     toast.success(response.message)
                     window.location.reload();
                 
                }else{
                     toast.error(response.message)
                }
            })
        }
  }



  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className='col-md-2'></div>
          <div className='col-md-10'>
          <ToastContainer/>
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
                  <input type='search' onChange={(e) => { handleSearch(e) }} className='mt-3 mb-3 ' placeholder='Search By Name' />
                </div>
                <div className='table-banner'>
                  <table className='table table-borderless text-start mt-5 table-banner'>
                    <thead className='mb-2'>
                      <tr className='' style={{ background: "#F6F6F6", height: "50px" }}>
                        <th></th>
                        <th></th>
                        <th>User Name</th>
                        <th>UserId</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>JoinedOn</th>
                        <th>Phone</th>
                        
                        <th>Info</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {users.map((i, key) => (
                        <>
                          <tr className="mt-2 text-start" style={{ background: "#F0EBEB" }}>
                            <td>{key + 1}</td>
                            <td><img src={i.profilePicture} style={{width:"35px",height:"35px",borderRadius:"50%"}}/></td>
                            <td>{i.fullName}</td>
                            <td>{i._id}</td>
                            {i.email==""?
                          <td>null</td> 
                          :
                          <td>{i.email}</td>
                          }
                           <td>{i.city},{i.state}</td>
                            <td>{`${new Date(i.creationTimeStamp).getDate()}/${new Date(i.creationTimeStamp).getMonth()+1}/${new Date(i.creationTimeStamp).getFullYear()}`}</td>
                            <td>{i.phone}</td>
                            
                            <td><Link to={`/users/moreDetails/${i._id}`} className='btn' style={{ background: "#D9D9D9", fontWeight: "bold" }}><InfoIcon/></Link></td>
                            <td><Link onClick={(e)=>{handleDeleteUser(e,i._id)}} className='btn' style={{ background: "red", fontWeight: "bold" }}><DeleteIcon/></Link></td>
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

export default AllUsers;