import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { admin_login_url } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/authSlice";
import { logo } from "../../constants";
const Auth = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const updateFormValues = (e) => {
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };
  const dispatch = useDispatch();
  const authFormSubmitHandler = async (e) => {
    e.preventDefault();
    const loadingId = toast.loading("verifying user kindly wait...");
    try {
      const loginResponse = await axios.post(`${admin_login_url}`, {
        ...formValues,
      });

      if (loginResponse.data.success) {
        toast.success("Login Success...");
        localStorage.setItem("adminToken", loginResponse.data.token);
        localStorage.setItem(
          "adminUser",
          JSON.stringify(loginResponse.data.admin)
        );
        document.cookie = `adminToken=${loginResponse.data.token}; path=/`;
        await dispatch(
          updateUser({
            ...loginResponse.data.admin,
            token: loginResponse.data.token,
          })
        );
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    toast.dismiss(loadingId);
  };
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo d-flex align-items-center flex-column ">
                    <img src={logo} alt="logo" className="w-50" />
                  </div>
                  <form className="pt-3" onSubmit={authFormSubmitHandler}>
                    <div className="form-group">
                      <input
                        required
                        onChange={updateFormValues}
                        type="email"
                        className="form-control form-control-lg"
                        id="name"
                        placeholder="Username"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        required
                        onChange={updateFormValues}
                        name="password"
                        type="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        type="submit"
                      >
                        SIGN IN
                      </button>
                      <div className="my-2 d-flex justify-content-between align-items-center">
                        <a href="#" className="auth-link text-black">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
    </>
  );
};

export default Auth;
