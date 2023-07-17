// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAllDepartmentsData } from "../../Departments/Hooks/useDepartmentData";
// import Loading from "../../Utils/Loading";
// import { useParams } from "react-router-dom";
// import "./employee-feature-add.css";

// import { checkEmployeeData } from "../../Utils/checkData";

// const AddEmployee = () => {
//   const navigate = useNavigate();

//   //getting id of department
//   const departmentId = useParams()?.departmentId;

//   //creating a state to store form data
//   const [formData, setFormData] = useState({
//     firstName: "",
//     email: "",
//     lastName: "",
//     contactNumber: "",
//     externalId: "",
//     departmentId: departmentId,
//     city: "",
//     street: "",
//     state: "",
//     country: "",
//     zip_code: "",
//   });

//   //Adding employee
//   const {
//     data: addConfirm,
//     mutate: addEmployee,
//     isLoading: addLoading,
//     isError: addIsError,
//     error: addError,
//   } = useAddEmployee(formData.departmentId);

//   //getting all departments
//   const { isError, error, isLoading, data } = useAllDepartmentsData();

//   //handling all state of the request adding
//   if (addLoading) return <Loading count={3} />;
//   if (addIsError) {
//     alert(addError.message);
//   }

//   //if operation successful navigate
//   if (addConfirm?.data?.operationStatus === "Success") {
//     navigate(-1);
//   }

//   //handling all state of the request department
//   if (isLoading) return <Loading count={3} />;
//   if (isError) {
//     alert(error.message);
//   }

//   //departments
//   const departments = data?.data?.data;

//   //handle change in value of input
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   //handle dropdown
//   const handleDropdownChange = (e) => {
//     setFormData({ ...formData, departmentId: e.target.value });
//   };

//   //creating a final data to send to Server
//   const finalData = {
//     firstName: formData.firstName,
//     email: formData.email,
//     lastName: formData.lastName,
//     contactNumber: formData.contactNumber,
//     id: formData.externalId,
//     departmentId: formData.departmentId,
//     address: {
//       city: formData.city,
//       street: formData.street,
//       country: formData.country,
//       state: "s",
//       zipCode: formData.zip_code,
//     },
//   };

//   //handle submit data
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const input_Error = checkEmployeeData(finalData);
//     console.log(input_Error);
//     if (input_Error === "") addEmployee(finalData);
//     else alert(input_Error);
//   };

//   //HTML
//   return (
//     <div className="main-Container">
//       <div className="component-container">
//         <span className="component-container-header">
//           <h2>Add Employee</h2>
//         </span>
//         <div className="component-container-body">
//           <form
//             onSubmit={handleSubmit}
//             className="grid-container-col2 add-employee"
//           >
//             <span>
//               <label htmlFor="externalId">External Id:</label>
//               <input
//                 type="text"
//                 id="externalId"
//                 name="externalId"
//                 value={formData.externalId}
//                 required
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 required
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="lastName">LastName:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 required
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="text"
//                 id="email"
//                 required
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="contactNumber">Contact Number:</label>
//               <input
//                 type="text"
//                 id="contactNumber"
//                 name="contactNumber"
//                 required
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label>Department:</label>

//               <select
//                 value={formData.departmentId}
//                 onChange={handleDropdownChange}
//                 required
//               >
//                 {departments.map((department) => {
//                   return (
//                     <option
//                       key={department.departmentId}
//                       value={department.departmentId}
//                     >
//                       {department.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </span>
//             <span>
//               <label htmlFor="street">Street:</label>
//               <input
//                 type="text"
//                 id="street"
//                 name="street"
//                 required
//                 value={formData.street}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="city">City:</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 required
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="country">Country:</label>
//               <input
//                 type="text"
//                 id="country"
//                 name="country"
//                 required
//                 value={formData.country}
//                 onChange={handleChange}
//               />
//             </span>
//             <span>
//               <label htmlFor="zip_code">Zip Code:</label>
//               <input
//                 type="text"
//                 id="zip_code"
//                 name="zip_code"
//                 required
//                 value={formData.zip_code}
//                 onChange={handleChange}
//               />
//             </span>
//             <button className="btn" id="blackBg" type="submit">
//               Submit
//             </button>
//             <button className="btn" id="whiteBg" onClick={() => navigate(-1)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;
