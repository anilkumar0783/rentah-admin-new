import Side from "../Partials/Side";
import { useEffect, useState } from "react";
//import Side from "../Partials/Side";
import { Link, useLocation } from "react-router-dom";
import { Bars } from  'react-loader-spinner'
 function SubCategory(props) {
    const[category,setCategory]= useState([])
    const[loaded,setLoaded] =useState(false)
    const token= localStorage.getItem('token')
    // const alocation = useLocation();
    // const subCategory = alocation.state
    const { subCategory } = props;
    console.log(subCategory)
    
    return ( 
        <>
         <div className="container-fluid">
         <div className="row">
            <Side/>
            <div className='col-md-2'></div>
            <div className='col-md-10'>
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
          <div>
                <table className='table table-borderless text-center mt-5'>
                    <thead className='mb-2'>
                        <tr className=''style={{background :"#F6F6F6",height :"50px"}}>
                            <th>S No</th>
                            <th>categoryName</th>
                            <th></th>
                        </tr>
                        <br/>
                    </thead>
                    <tbody className=''>
                        {category.map((i,key)=>(
                            <>
                            <tr className="mt-2" style={{background :"#F0EBEB"}}>
                            <td>{key+1}</td>
                            <td>{i.categoryName}</td>
                            <td><Link className="btn" style={{background :"#D9D9D9",fontWeight :"bold"}}>view SubCategories</Link></td>
                        </tr>
                        <br/>
                        </>
                        ))}
                        
                    </tbody>
                </table>
               </div>
}
            </div>
         </div>
         </div>
        </>
     );
}

export default SubCategory;