import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Partials/Navbar';
import Side from '../Partials/Side';
import { Bars, LineWave } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

function BusinessUser() {
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [currPage, setCurrPage] = useState(0);
    const [search, setSearch] = useState('');
    const [postPerPage, setPostPerPage] = useState(20);
    const [loaded, setLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Track if more data is available
    const token = localStorage.getItem('token');
    const adminType = localStorage.getItem('adminType');
    const rights = localStorage.getItem('rights');

    function handleSearch(e) {
        setSearch(e.target.value);
        setUsers([]);
        setCurrPage(0);
        setHasMore(true); 
    }

    useEffect(() => {
        if (!hasMore) return;

        fetch(`http://24.199.104.72/api/admin-users?skip=${currPage * postPerPage}&limit=${postPerPage}&fullName=${search}`, {
            headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.status) {
                const jsonData = response.users;
                jsonData.sort((a, b) => new Date(b.creationTimeStamp) - new Date(a.creationTimeStamp));

                setUsers((prevData) => {
                    const combinedData = [...prevData, ...jsonData];
                    const uniqueData = Array.from(new Map(combinedData.map(user => [user._id, user])).values());
                    return uniqueData;
                });

                setLoaded(true);
                
                setHasMore(jsonData.length === postPerPage); 
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, [currPage, search, hasMore]);

    const handleIntersection = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
            setCurrPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        const target = document.querySelector('#scroll-target');

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [handleIntersection, hasMore]);

    function handleDeleteUser(e, userId) {
        const userRes = window.confirm('Are you sure you want to delete this user?');
        if (userRes) {
            fetch(`http://24.199.104.72/api/users/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
            })
            .then((res) => res.json())
            .then((response) => {
                if (response.status) {
                    toast.success(response.message);
                    setUsers(users.filter((user) => user._id !== userId));
                } else {
                    toast.error(response.message);
                }
            });
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Side />
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        <ToastContainer />
                        {adminType === 'superAdmin' || rights.includes('Add a new users') ? (
                            <div>
                                <Link to="/users/add-user">
                                    <button className="btn mt-3" style={{ background: '#179778' }}>
                                        Add User +
                                    </button>
                                </Link>
                            </div>
                        ) : null}
                        {!loaded ? (
                            <div className="loader" style={{ marginLeft: '46%', marginTop: '21%' }}>
                                <Bars height="60" width="60" color="#179778" ariaLabel="bars-loading" visible={true} />
                            </div>
                        ) : (
                            <>
                                {adminType === 'superAdmin' || rights.includes('View all business users') ? (
                                    <div className="table-banner">
                                        <table className="table table-borderless mt-5 table-banner">
                                            <thead className="mb-2">
                                                <tr style={{ background: '#F6F6F6', height: '50px' }}>
                                                    <th></th>
                                                    <th></th>
                                                    <th className='text-start'>User Name</th>
                                                    <th>UserId</th>
                                                    <th className='text-start'>Email</th>
                                                    <th>Joined</th>
                                                    <th>ph.</th>
                                                    {adminType === 'superAdmin' || rights.includes('Add listings/request to a user') ? (
                                                        <>
                                                            <th>List</th>
                                                            <th>Req.</th>
                                                        </>
                                                    ) : null}
                                                    <th className='text-center'>info</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((i, key) => (
                                                    <tr key={i._id} style={{ background: '#F0EBEB' }} >
                                                        <td>{key + 1 }</td> 
                                                        <td>
                                                            <img src={i.profilePicture} alt="profile" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                                                        </td>
                                                        <td>{i.fullName}</td>
                                                        <td>{i._id}</td>
                                                        <td>{i.email || 'null'}</td>
                                                        <td>{`${new Date(i.creationTimeStamp).getDate()}/${new Date(i.creationTimeStamp).getMonth() + 1}/${new Date(i.creationTimeStamp).getFullYear()}`}</td>
                                                        <td>{i.phone}</td>
                                                        {adminType === 'superAdmin' || rights.includes('Add listings/request to a user') ? (
                                                            <>
                                                                <td>
                                                                    <Link to={`/business-user/listing/add/${i._id}`} style={{ color: 'green' }}>
                                                                        <AddIcon />
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/business-user/request/add/${i._id}`} style={{ color: 'green' }}>
                                                                        <AddIcon />
                                                                    </Link>
                                                                </td>
                                                            </>
                                                        ) : null}
                                                        <td>
                                                            <Link to={`/users/moreDetails/${i._id}`} className="btn pt-1 " style={{ fontWeight: 'bold' }}>
                                                                <InfoIcon style={{ fontSize: "32px" }} />
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button onClick={(e) => handleDeleteUser(e, i._id)} className="btn pt-1" style={{ color: "red" }}>
                                                                <DeleteIcon style={{ fontSize: "32px" }} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {hasMore && (
                                            <div id="scroll-target" style={{ height: '2px', marginLeft: '46%' }}>
                                                <LineWave height="100" width="100" color="#4fa94d" ariaLabel="line-wave" visible={true} />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BusinessUser;