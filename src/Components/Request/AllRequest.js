import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Partials/Navbar';
import Side from '../Partials/Side'
import { Bars, LineWave } from 'react-loader-spinner'
import { hover } from '@testing-library/user-event/dist/hover';
function AllRequest() {
    const [data, setNewData] = useState([])
    const [users, setUsers] = useState([])
    const [currPage, setCurrPage] = useState(20)
    const [search, setSearch] = useState("")
    const [postPerPage, setPostPerPage] = useState(20)
    const [loaded, setLoaded] = useState(false)
    const token = localStorage.getItem('token')

    function handleSearch(e) {
    
        setSearch(e.target.value)
        setUsers([])
        setCurrPage(0)
      }
      useEffect(() => {
        fetch(`http://24.199.104.72/api/user-requests-admin?skip=${currPage}&limit=${postPerPage}&title=${search}`, {
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
          })
    
      }, [currPage,search])


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
                  <input type='search' onChange={(e) => { handleSearch(e) }} className='mt-3 mb-3 '  placeholder='Search By Name' />
                </div>
                <div className='table-banner'>
                  <table className='table table-borderless text-center mt-5 table-banner'>
                    <thead className='mb-2'>
                      <tr className='' style={{ background: "#F6F6F6", height: "50px" }}>
                        <th>S No</th>
                        {/* <th>List Id</th> */}
                        <th>Name</th>
                        <th>Category</th>
                        <th>Joined ON</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {users.map((i, key) => (
                        <>
                          <tr className="mt-2" style={{ background: "#F0EBEB" }}>
                            <td>{key + 1}</td>
                            {/* <td>{i._id}</td> */}
                            <td>{i.title}</td>
                            <td>{i.category}</td>
                            <td>{`${new Date(i.creationTimeStamp).getDate()}/${new Date(i.creationTimeStamp).getMonth()+1}/${new Date(i.creationTimeStamp).getFullYear()}`}</td>
                            {i.type==0 && <td>Day</td>}
                            {i.type==1 && <td>Week</td>}
                            {i.type==2 && <td>Month</td>}
                            {i.type==3 && <td>For Sale</td>}
                            {/* {i.type===null && <td>For Sale</td>} */}
                            <td><Link to={`/users/request/${i._id}`} className='btn' style={{ background: "#D9D9D9", fontWeight: "bold" }}>View Details</Link></td>
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

export default AllRequest;