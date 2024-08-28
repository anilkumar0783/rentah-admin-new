import { Link } from "react-router-dom";

function Navbar() {
  function handleLogOut(){
    let res= window.confirm("Are you sure to log out")
    if(res===true){
                localStorage.removeItem('expirationTime');
                localStorage.removeItem('adminId')
                localStorage.removeItem('adminImage')
                localStorage.removeItem('adminName')
                localStorage.removeItem('loginstatus',1)
                localStorage.removeItem("adminType")
                localStorage.removeItem("rights")
                window.location.reload()
    }
  }
    return ( 
        <>
        <nav className="navbar navbar-light bg-light" style={{}}>
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">DASHBOARD
</span> 
<span className="navbar-brand mb-0 h1"><Link to="/admin/profile" className="text-dark fs-2"><i class="bi bi-person-circle"></i></Link>
<span className="ms-3 mb-5" style={{cursor:"pointer"}} onClick={handleLogOut}><i class="bi bi-box-arrow-right text-danger fs-3"></i></span>
</span> 

  </div>
</nav>
        </>
     );
     
}

export default Navbar;