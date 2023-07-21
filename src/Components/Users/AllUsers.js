import { useEffect , useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Partials/Navbar';
import Side from '../Partials/Side'
import { Bars } from  'react-loader-spinner'
import { hover } from '@testing-library/user-event/dist/hover';
function AllUsers() {
    let location =useLocation()
    const [data,setNewData]=useState([])
    const [users,setUsers]=useState([])
    const [currPage, setCurrPage] = useState(1)
    const[search,setSearch]=useState("")
const [postPerPage, setPostPerPage] = useState(10)
const[loaded,setLoaded]=useState(false)
const token= localStorage.getItem('token')

// useEffect(() => {
//     handleSearch(e);
//   }, [users, search])

function handleSearch(e){
  setSearch(e.target.value)
   
    if(search!==""){
        const searchedData= users.filter(i=>{
           return i.fullName.toLowerCase().includes(search)
          })
          setCurrPage(1)
        setUsers(searchedData)
    }else{
        
    }
    
   }
useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    console.log(page)
    setCurrPage(Number(page) || 1);
  }, [location.search]);
    useEffect(()=>{
        fetch(`http://24.199.104.72/api/users?skip=${currPage}&limit=${postPerPage}`,{
        headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
    }).then((res)=>{return res.json()})
    .then((response)=>{
        if(response.status===true){
            setUsers(response.users)
            setLoaded(true)
            // console.log(seeker)
        }
    })
    },[])
    async function handleNext(){
        // if(totalPages>currPage){
            setCurrPage(currPage+1)
            setLoaded(false)
        //    alert(currPage+1)
                fetch(`http://24.199.104.72/api/users?skip=${currPage+1}&limit=${postPerPage+(postPerPage*currPage)}`,{
                headers: {Authorization: `bearer ${token}`,"Content-Type":"application/json" }
            }).then((res)=>{return res.json()})
            .then((response)=>{
                if(response.status===true){
                    setUsers(response.users)
                    setLoaded(true)
                    // console.log(seeker)
                }
            })
         
        // }
       
     }
    
    useEffect(()=>{
        const lastPostIndex= currPage * postPerPage;
        const firstPostIndex= lastPostIndex - postPerPage;
        
            setNewData(users.slice(firstPostIndex,lastPostIndex))
        },[data])
        let totalPages= Math.ceil((users.length)/postPerPage)
        function handlePrev(){
            if(currPage>=2){
         setCurrPage(currPage-1)
            }
         }
        
        
        
         
        
    return ( 
        <>
        <div className="container-fluid">
            <div className="row">
                <Side/>
                <div className='col-md-2'></div>
                <div className='col-md-10'>
                <div>
                    <Link to="/users/add-user"><button className='btn mt-3' style={{background :"#179778"}}>Add User +</button></Link>
                </div>
                {loaded==false ? 
                       <div className="loader" style={{marginLeft :"46%",marginTop :"21%"}}>
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
                        <input type='search' onChange={(e)=>{handleSearch(e)}} className='mt-3 mb-3 pb-3' placeholder='Search By Name' />
                       </div>
               <div className='table-banner'>
                <table className='table table-borderless text-center mt-5 table-banner'>
                    <thead className='mb-2'>
                        <tr className=''style={{background :"#F6F6F6",height :"50px"}}>
                            <th>S No</th>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {data.map((i,key)=>(
                            <>
                            <tr className="mt-2" style={{background :"#F0EBEB"}}>
                            <td>{key+1}</td>
                            <td>{i._id}</td>
                            <td>{i.fullName}</td>
                            <td>{i.email}</td>
                            <td>{i.phone}</td>
                            <td><Link to={`/users/moreDetails/${i._id}/${currPage}`} className='btn' style={{background :"#D9D9D9",fontWeight :"bold"}}>View Details</Link></td>
                        </tr>
                        <br/>
                        </>
                        ))}
                        
                    </tbody>
                </table>
               </div>
              <div className='btn-paging'>
              <button className='btn ms-3' style={{background :"grey"}} onClick={handlePrev}>PREV</button>
              </div>
              <div className='btn-paging'>
              <p className='pages ms-3 mt-1'>{currPage} of {totalPages}</p>
              </div>
              <div className='btn-paging'>
              <button className='btn ms-3 ' style={{background :"#179778"}} onClick={handleNext}>NEXT</button>
              </div>
              </>
                        }
              </div>
            </div>
            
        </div>
        
        </>
     );
}

export default AllUsers;