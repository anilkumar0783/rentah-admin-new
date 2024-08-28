import { useMemo, useState } from "react";
import Side from "../Partials/Side";
import { ToastContainer, toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { goods, service, spaces } from "../../data";
//import { countries } from 'countries-list';
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function Notification() {
  //const countryCodes = Object.keys(countries);
  const options = useMemo(() => countryList().getData(), []);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [loaded, setLoaded] = useState(true);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  function handleSubmit(e) {
    let title1 = document.getElementById("title1").value;
    let msg1 = document.getElementById("msg1").value;
    e.preventDefault();

    if (title1 == "") {
      toast.error("please enter Title");
    }
    if (title1.trim() == "") {
      toast.error("please enter valid Title");
    }
    if (msg1 == "") {
      toast.error("please enter message");
    }
    if (msg1.trim() == "") {
      toast.error("please enter valid message");
    } else {
      setLoaded(false);
      let formData = { title, message };
      console.log(title, message);
      fetch(`http://24.199.104.72/api/notifications/users`, {
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
          if (response.status === true) {
            alert("hello");
            toast.success(response.message);
            setLoaded(true);
          } else {
            toast.error("notification couldn't send");
            setLoaded(true);
          }
        });
    }
  }

  function handleCheckBox(e) {
    const { value, checked } = e.target;
    if (checked) {
      setsubCategories((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setsubCategories((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  }
  function handleSubmitByCategory(e) {
    let title3 = document.getElementById("title3").value;
    let msg3 = document.getElementById("msg3").value;
    e.preventDefault();

    if (title3 == "") {
      toast.error("please enter Title");
    }
    if (title3.trim() == "") {
      toast.error("please enter valid Title");
    }
    if (msg3 == "") {
      toast.error("please enter message");
    }
    if (msg3.trim() == "") {
      toast.error("please enter valid message");
    } else {
      setLoaded(false);

      let formData = { title, message, subCategories };
      console.log(title, message, subCategories);
      fetch(`http://24.199.104.72/api/notifications/sub-categories`, {
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
          if (response.status === true) {
            //alert('hello')
            toast.success(response.message);
            setLoaded(true);
          }
          if (response.status === false) {
            //alert('hello')
            toast.error("notification couldn't send");
            setLoaded(true);
          }
        });
    }
  }
  function handleSubmitPaticular(e) {
    let title2 = document.getElementById("title2").value;
    let msg2 = document.getElementById("msg2").value;
    e.preventDefault();

    if (title2 === "") {
      toast.error("please enter Title");
    }
    if (title2.trim() === "") {
      toast.error("please enter valid Title");
    }
    if (msg2 === "") {
      toast.error("please enter message");
    }
    if (msg2.trim() === "") {
      toast.error("please enter valid message");
    } else {
      setLoaded(false);

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
  }
  function handleCategory(e) {
    if (e.target.value == "0") {
      setSubCategoryData(goods);
    }
    if (e.target.value == "1") {
      setSubCategoryData(service);
    }
    if (e.target.value == "2") {
      setSubCategoryData(spaces);
      // console.log(categorydata.goods)
    }
  }

  console.log(code);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Side />
          <div className="col-md-2"></div>

          <div className="col-md-10">
            {loaded == false ? (
              <div
                className="loader"
                style={{ marginLeft: "40%", marginTop: "21%" }}
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
                <ToastContainer />
                <div
                  className="accordion mt-5"
                  id="accordionExample"
                  style={{ display: "block" }}
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Send Notification To All
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="send-noti-div-p">
                          <div className="send-noti-div">
                            <form
                              method="post"
                              onSubmit={(e) => {
                                handleSubmit(e);
                              }}
                            >
                              <label className="form-label mt-3 ">Title</label>
                              <br />
                              <input
                                type="text"
                                className=" form-control"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                                id="title1"
                              />
                              <br />
                              <label className="form-label ">Message</label>
                              <br />
                              <textarea
                                className="text-area form-control"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                }}
                                id="msg1"
                              ></textarea>
                              <button
                                type="submit"
                                className="btn form-control send-btn mt-4"
                              >
                                Send Notification
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Send Notification To Particular User
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="send-noti-div-p">
                          <div className="send-noti-div">
                            <form
                              method="post"
                              onSubmit={(e) => {
                                handleSubmitPaticular(e);
                              }}
                            >
                              <label className="form-label mt-3 ">Title</label>
                              <br />
                              <input
                                type="text"
                                className=" form-control"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                                id="title2"
                              />
                              <br />
                              <label className="form-label ">Message</label>
                              <br />
                              <textarea
                                className="text-area form-control"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                }}
                                id="msg2"
                              ></textarea>

                              <br />
                              {/* <Select options={options} value={code} onChange={handlecode} /> */}
                              <PhoneInput
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={setPhone}
                              />
                              <br />

                              <button
                                type="submit"
                                className="btn form-control send-btn mt-4"
                              >
                                Send Notification
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Send Notification By Sub-Categories
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="send-noti-div-p">
                          <div className="send-noti-div">
                            <form
                              method="post"
                              onSubmit={(e) => {
                                handleSubmitByCategory(e);
                              }}
                            >
                              <label className="form-label mt-3 ">Title</label>
                              <br />
                              <input
                                type="text"
                                className=" form-control"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                                id="title3"
                              />
                              <br />
                              <label className="form-label ">Message</label>
                              <br />
                              <textarea
                                className="text-area form-control"
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                }}
                                id="msg3"
                              ></textarea>
                              <select
                                className="form-select mt-3"
                                onChange={(e) => {
                                  handleCategory(e);
                                }}
                                id="cate"
                              >
                                <option selected>Open this select menu</option>
                                <option value="0">Goods</option>
                                <option value="1">Services</option>
                                <option value="2">Spaces</option>
                              </select>

                              {subCategoryData?.map((i) => (
                                <div class="form-check form-check-inline mt-3">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="inlineCheckbox1"
                                    checked={subCategories.includes(i)}
                                    value={i}
                                    onChange={handleCheckBox}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="inlineCheckbox1"
                                  >
                                    {i}
                                  </label>
                                </div>
                              ))}

                              <button
                                type="submit"
                                className="btn form-control send-btn mt-4"
                              >
                                Send Notification
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
