import { Link } from "react-router-dom";

function Navbar() {
    return ( 
        <>
        <nav className="navbar navbar-light bg-light" style={{overflow :"hidden"}}>
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">DASHBOARD
</span> 
<span className="navbar-brand mb-0 h1"><Link to="/admin/profile" className="text-dark fs-2"><i class="bi bi-person-circle"></i></Link>
</span> 
  </div>
</nav>
        </>
     );
     
}

export default Navbar;