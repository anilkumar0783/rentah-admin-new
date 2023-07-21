import { useLocation, useParams } from "react-router-dom";
import Side from "../Partials/Side";

function ReportDetail() {
    // const {userData,reportUserData}=useParams
    // console.log(userData)
    const alocation = useLocation();
console.log(alocation.state)
//console.log(userData)
    return ( 
    <>
     <div className="container-fluid">
     <div className="row">
        <Side/>
        <div className='col-md-2'></div>
        <div className='col-md-10'>
            <div className="report-div">
                <h5></h5>
                <div>
                    {/* <img src={userData.profilePicture}/> */}
                </div>
            </div>
            <div className="report-div">
            <h5>Reported User</h5>
            </div>
        </div>
     </div>
     </div>
    </>
     );
}

export default ReportDetail;