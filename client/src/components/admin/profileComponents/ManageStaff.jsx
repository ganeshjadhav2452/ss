import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import Slidebar from "../../Slidebar";
import axios from "axios";
import {
  create_staff_url,
  delete_staff_url,
  get_admin_permissions,
  get_staff_list_url,
} from "../../../constants/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentStaff } from "../../../store/slices/staffSlice";

const ManageStaff = () => {
  const [openForm, setOpenForm] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleUpdateFormValues = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  // const [adminPermissions, setAdminPermissions] = useState([])
  const handleCheckboxChange = (event) => {
    const itemName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, itemName]);
    } else {
      const updatedItems = checkedItems.filter((item) => item !== itemName);
      setCheckedItems(updatedItems);
    }
  };

  const getAdminPermissions = async () => {
    try {
      const permissionResponse = await axios.get(`${get_admin_permissions}`);
      setPermissionsList(permissionResponse.data.permissions);
    } catch (error) {
      console.log(error);
    }
  };

  const submitStaffHandler = async (e) => {
    e.preventDefault();

    const arrayOfPermissions = [];
    permissionsList.forEach((permission) => {
      console.log(permission.id);
      if (checkedItems.includes(permission.id.toString())) {
        arrayOfPermissions.push(permission);
      }
    });
    console.log(
      "this is filled data for the admin user",
      formData,
      arrayOfPermissions,
      checkedItems
    );
    const payload = {
      ...formData,
      arrayOfPermissions,
    };
    try {
      const createStaffResponse = await axios.post(create_staff_url, payload);
      console.log("createstaff response", createStaffResponse);
      setCheckedItems([]);
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
      });
      setOpenForm(false);
      getStaffList();
      toast.success("staff created successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while creating the staff");
    }
  };

  const getStaffList = async () => {
    try {
      const responseOfGetStaffList = await axios.get(get_staff_list_url);
      console.log(
        "this is stafflist that we got",
        responseOfGetStaffList.data.staffList
      );
      setStaffList(responseOfGetStaffList.data.staffList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStaffClickHandler = async (staffId) => {
    const ok = window.confirm("are you sure , you want to delete this staff");
    if (ok) {
      try {
        const responseOfDeleteStaff = await axios.delete(
          `${delete_staff_url}/${staffId}`
        );

        toast.success("staff deleted successfully");
        getStaffList();
      } catch (error) {
        toast.error("something went wrong while deleting staff");
      }
    } else {
      return;
    }
  };

  const updateStaffHandler = (staff) => {
    dispatch(updateCurrentStaff(staff));
  };
  useEffect(() => {
    getAdminPermissions();
    getStaffList();
  }, []);
  return (
    <div className="container-scroller">
      <NavBar />

      <div
        className="container-fluid page-body-wrapper "
        style={{
          backgroundColor: "rgb(244,245,247)",
        }}
      >
        <Slidebar />

        <div className="main-panel col ">
          <div className="content-wrapper ">
            {!openForm && (
              <div className="card">
                <div className="card-body ">
                  <div className="w-100 d-flex justify-content-end">
                    <button
                      className="btn btn-info "
                      onClick={() => setOpenForm(true)}
                    >
                      Add Staff
                    </button>
                  </div>
                  <h4 className="card-title">Manage Staff</h4>

                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Permissions</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffList?.map((staff) => {
                          console.log(
                            "this is permissions of staff",
                            staff.permissions
                          );
                          let permissions = staff.permissions
                            ? JSON.parse(staff.permissions)
                            : [];

                          let permissionArray = permissions.map(
                            (perm) => perm.permission
                          );
                          return (
                            <tr>
                              <td>{staff.name}</td>
                              <td>{staff.email}</td>
                              <td className="overflow-auto">
                                {permissionArray.join(",")}
                              </td>
                              <td className=" ">
                                <Link
                                  onClick={() => updateStaffHandler(staff)}
                                  to={`/admin/edit_staff/${staff.id}`}
                                  className="badge badge-success btn"
                                >
                                  Edit
                                </Link>

                                <label
                                  onClick={() =>
                                    deleteStaffClickHandler(staff.id)
                                  }
                                  className="badge badge-danger ms-3 btn  "
                                >
                                  Delete
                                </label>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {openForm && (
              <div className="container card p-5">
                <div className="w-100 d-flex justify-content-end ">
                  <button
                    className="btn btn-danger "
                    onClick={() => setOpenForm(false)}
                  >
                    Back
                  </button>
                </div>
                <form onSubmit={submitStaffHandler}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={handleUpdateFormValues}
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Admin Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      value={formData.address}
                      onChange={handleUpdateFormValues}
                      type="text"
                      name="address"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      value={formData.phone}
                      onChange={handleUpdateFormValues}
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="123-456-7890"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      value={formData.email}
                      onChange={handleUpdateFormValues}
                      type="email"
                      name="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      value={formData.password}
                      onChange={handleUpdateFormValues}
                      type="password"
                      name="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                    />
                  </div>
                  <h3>Permissions:</h3>
                  <div className="row w-100 ms-5 ">
                    {permissionsList.map((permission, index) => (
                      <div key={index} className="col-md-5 ">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`permission-${permission.id}`}
                            name={permission.id}
                            // checked={checkedItems.includes(permission.id)}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`permission-${permission.id}`}
                          >
                            {permission.permission}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
