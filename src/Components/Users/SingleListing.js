import { useNavigate, useParams, Link } from "react-router-dom";
import Side from "../Partials/Side";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import EditListingForm from "../Listing/EditListingForm";
function SingleListing() {
  const { listId } = useParams();
  let Navigate = useNavigate();
  const [user, setUser] = useState({});
  const [list, setList] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const phone = user.phone;
  // const token = localStorage.getItem('token')
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`http://24.199.104.72/api/listings/${listId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == true) {
          setLoaded(true);
          setList(response.data);
          console.log(response.userRequests);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`http://24.199.104.72/api/users/${list.userId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == true) {
          setLoaded2(true);
          setUser(response.user);
          // setListings(response.listings)
          // setRequest(response.userRequests)
          console.log(response.userRequests);
        }
      });
  }, [list]);

  function handleDelete(e, listId) {
    const userRes = window.confirm("Are You Sure To Delete List");
    if (userRes === true) {
      fetch(`http://24.199.104.72/api/listings/${listId}/delete`, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.status == true) {
            toast.success(response.message);
            Navigate(-1);
          } else {
            toast.error(response.message);
          }
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let formData = { title, message, phone };
    console.log(formData);
    fetch(`http://24.199.104.72/api/notifications/users/phone`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == true) {
          //alert('hello')
          toast.success(response.message);
          setLoaded(true);
        }
        if (response.status == false) {
          //alert('hello')
          toast.error(response.message);
          setLoaded(true);
        }
      });
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <ToastContainer />
            {loaded == false ? (
              <div
                className="loader"
                style={{ marginLeft: "46%", marginTop: "21%" }}
              >
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
            ) : (
              <>
                <p className="fs-3">
                  <i
                    className="bi bi-chevron-compact-left fs-2"
                    onClick={() => {
                      Navigate(-1);
                    }}
                    style={{ cursor: "pointer" }}
                  ></i>
                  Listing Details
                </p>

                {/* <div className=""> */}
                <div className="row">
                  <div className="d-flex justify-content-start gap-2">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop2"
                      className="btn btn-primary mt-5"
                    >
                      Edit
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="btn btn-primary mt-5"
                    >
                      Send Notification
                    </button>
                    <Link
                      to={`/users/moreDetails/${user._id}`}
                      className="mt-5 btn btn-primary"
                    >
                      View User Details
                    </Link>
                    <button
                      className="btn btn-danger mt-5"
                      onClick={(e) => {
                        handleDelete(e, list._id);
                      }}
                    >
                      Delete Listings
                    </button>
                  </div>
                </div>
                <div className="row " style={{ marginTop: "100px" }}>
                  <div className="col-md-6 fs-5">
                    <lable className="fw-bold">Listing Title</lable>
                    <p>{list.title}</p>
                    <lable className="fw-bold">Listing Description</lable>
                    <p>{list.description}</p>
                    {list.bookingLink && (
                      <>
                        <label className="fw-bold">Booking Link</label>
                        <p>{list.bookingLink}</p>
                      </>
                    )}
                    <lable className="fw-bold">Listing Price</lable>
                    {list.type == 0 && <p>${list.budget}/Day</p>}
                    {list.type == 1 && <p>${list.budget}/Week</p>}
                    {list.type == 2 && <p>${list.budget}/Month</p>}
                    {list.type == 3 && <p>${list.budget}/Sell</p>}
                    {list.type == 4 && <p>${list.budget}/Hour</p>}
                    {list.type == 5 && <p>${list.budget}/Custom </p>}
                    {list.type == 6 && <p>${list.budget}/Year</p>}
                    {/* <p>${list.budget}</p> */}
                    <lable className="fw-bold">Listing Category</lable>
                    <br />
                    <span
                      class="badge rounded-pill mb-3 "
                      style={{ background: "#179778" }}
                    >
                      {list.category === "0" && "Goods"}
                      {list.category === "1" && "Service"}
                      {list.category === "2" && "Spaces"}
                      {list.category === "Goods" && "Goods"}
                      {list.category === "Services" && "Service"}
                      {list.category === "Spaces" && "Spaces"}
                    </span>
                    <br />
                    <lable className="fw-bold mt-2">Listing Sub Category</lable>
                    <br />
                    {list.subCategory?.map((i) => (
                      <span
                        class="badge rounded-pill ms-1 mb-3"
                        style={{ background: "#179778" }}
                      >
                        {i}
                      </span>
                    ))}
                    <br />
                    <lable className="fw-bold mt-2">Listing Tags</lable>
                    <br />
                    {list.tags?.map((i) => (
                      <span
                        class="badge rounded-pill ms-1 "
                        style={{ background: "#179778" }}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                  <div className=" col-md-6">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner">
                        {list.listingPhotos?.map((i, index) => (
                          <div
                            className={`carousel-item ${index === 0 ? "active" : ""
                              }`}
                            key={index}
                          >
                            <img
                              src={i}
                              className="d-block w-100"
                              alt="..."
                              style={{ width: "300px", height: "300px" }}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <p className="mt-3 fs-5 fw-bold">Created by-</p>
                {loaded2 == false ? (
                  <div
                    className="loader"
                    style={{ marginLeft: "46%", marginTop: "4%" }}
                  >
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
                ) : (
                  <div className="row">
                    <div className="col-md-3 fs-5">
                      <img
                        style={{ height: "100px", width: "100px" }}
                        src={user.profilePicture}
                      />
                      <br />
                      <label className="fw-bold">{user.fullName}</label>
                      <br />
                      <label className="">Created On</label>
                      <p>{`${new Date(user.creationTimeStamp).getDate()}/${new Date(user.creationTimeStamp).getMonth() + 1
                        }/${new Date(user.creationTimeStamp).getFullYear()}`}</p>

                      <br />
                    </div>
                  </div>
                )}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Send Notification
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            <input
                              type="text"
                              className="form-control mt-3"
                              placeholder="Notification Title"
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                            <input
                              type="text"
                              className="form-control mt-3"
                              placeholder="Notification Body"
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class="modal-footer">
                          {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* 
/////////   edit listing modal ///////////

*/}


                {/* </div> */}
              </>
            )}
            <div
              class="modal fade"
              id="staticBackdrop2"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                style={{ border: "none" }}
              >
                <div
                  class="modal-content"
                  style={{ borderRadius: "15px", border: "none" }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdrop2">
                      Edit Listing
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <EditListingForm list={list} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleListing;
