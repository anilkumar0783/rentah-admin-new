import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function AddSubAdmin() {
  const [rightList, setRightList] = useState([
    "View users",
    "Update banners",
    "Send notifications",
    "View spam users",
    "Handle support queries",
    "Update categories",
    "View listings",
    "View requests",
    "Add a new users",
    "Add listings/request to a user",
    "View all business users",
  ]);
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName] =useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [adminType,setAdminType]=useState("subAdmin")
  const [rights,setRights] =useState([])

  function handleRights(e){
   setRights([...rights,e.target.value])

   const filData= rightList.filter(i=>{
    return i!==e.target.value
   })
   setRightList(filData)
  }
  function handleRemoveRights(value){
  const filData= rights.filter(i=>{
    return i!==value
   })
   setRights(filData)
   setRightList([...rightList,value])
  }

  function handleSubmit(e){
    e.preventDefault()
    let formData ={firstName,lastName,email,password,adminType,rights}
    fetch(`http://24.199.104.72/api/admins/register`, {
            method:"POST",
            headers: {  "Content-Type": "application/json" },
            body:JSON.stringify(formData)
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
  return (
    <>
    <ToastContainer/>
      <form method="POST" onSubmit={(e)=>{handleSubmit(e)}}>
        <lable>First Name</lable>
        <input type="text" className="form-control" 
        value={firstName}
        onChange={(e)=>{setFirstName(e.target.value)}}
        />
        <lable>Last Name</lable>
        <input type="text" className="form-control" 
             value={lastName}
             onChange={(e)=>{setLastName(e.target.value)}}
        />
        <lable>Email</lable>
        <input type="email" className="form-control" 
             value={email}
             onChange={(e)=>{setEmail(e.target.value)}}
        />
        <lable>Password</lable>
        <input type="password" className="form-control" 
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
        />
        <lable>Select Rights</lable>
        <select className="form-select" onChange={handleRights}>
            <option>Please Select Rights</option>
          {rightList.map((i) => (
            <option value={i}>{i}</option>
          ))}
        </select>
        <br/>
        {rights.map(i=>(
            <div className="d-flex justify-content-between mt-2">
                <div>{i}</div>
                <div className="" style={{cursor:"pointer"}} onClick={(e)=>{handleRemoveRights(i)}}><i class="bi bi-x-lg font-bolder text-danger"></i></div>
            </div>
        ))}
        <br/>
        {firstName ==="" || lastName === "" || email==="" || password==="" || rights.length===0 ? 
        <button type="submit" className="btn btn-success form-control" disabled>Add</button>
        :
        <button type="submit" className="btn btn-success form-control">Add</button>
    }
      </form>
    </>
  );
}

export default AddSubAdmin;
