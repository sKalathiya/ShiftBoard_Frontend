export const checkEmployeeData = (employee) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";

  if (!re.test(employee.email)) {
    inputError = inputError + "Not a valid email.  ";
  }
  if (isNaN(+employee.externalId)) {
    inputError = inputError + "Id should always be numbers.  ";
  }

  if (isNaN(+employee.contactNumber) || employee.contactNumber.length !== 11) {
    inputError = inputError + "Contact Number is not valid.  ";
  }
  if (employee.zip_code.length < 6) {
    inputError = inputError + "Zip Code is not valid.  ";
  }

  return inputError === "" ? "" : inputError;
};

export const checkDepartmentData = (department) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";

  if (!re.test(department.email)) {
    inputError = inputError + "Not a valid email.  ";
  }

  return inputError === "" ? "" : inputError;
};

export const checkScheduleData = (s) => {
  let inputError = "";

  return inputError === "" ? "" : inputError;
};

export const checkDepartmentUpdate = (department) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";
  if (!re.test(department.email)) {
    inputError = inputError + "Not a valid email.  ";
  }
  return inputError === "" ? "" : inputError;
};

export const checkEmployeeUpdate = (employee) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";
  if (!re.test(employee.email)) {
    inputError = inputError + "Not a valid email.  ";
  }
  if (employee.contactNumber.length !== 12) {
    inputError = inputError + "Contact Number is not valid.  ";
  }
  if (employee.zip_code.length < 6) {
    inputError = inputError + "Zip Code is not valid.  ";
  }
  return inputError === "" ? "" : inputError;
};

export const CheckEmployeeWithFilter = (employee, filter) => {
  if (filter.department != 0) {
    if (employee.departmentId != filter.department) return false;
  }

  if (!employee.firstName.includes(filter.firstName)) return false;

  if (filter.email != "") if (employee.email != filter.email) return false;

  if (filter.eId != "") if (employee.id != filter.eId) return false;

  return true;
};

export const CheckDepartmentWithFilter = (department, filter) => {
  if (!department.name.includes(filter.name)) return false;

  if (filter.email != "") if (department.email != filter.email) return false;

  if (filter.dId != "") if (department.departmentId != filter.dId) return false;

  return true;
};

export const checkLeaveWithFilter = (leave, filter) => {
  if (filter.employeeId != "")
    if (leave.employeeId != filter.employeeId) return false;

  if (filter.category != "Select Category of Leave")
    if (leave.category != filter.category) return false;

  if (filter.date != "") if (leave.date != filter.date) return false;
  return true;
};

export const checkRestrictionWithFilter = (r, filter) => {
  if (filter.employeeId != "")
    if (r.employeeId != filter.employeeId) return false;

  return true;
};

// Function to get the day of the week
function getDayOfWeek(dateStr) {
  const date = new Date(dateStr);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return daysOfWeek[date.getDay()];
}

// Function to format time to AM and PM
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const parsedHours = parseInt(hours);
  const amPM = parsedHours >= 12 ? "PM" : "AM";
  const formattedHours =
    parsedHours % 12 === 0
      ? "12"
      : (parsedHours % 12).toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${minutes} ${amPM}`;
  return formattedTime;
};

// Function to format and sort the data
export const formatAndSortData = (data) => {
  const formattedData = Object.entries(data).map(([date, value]) => {
    const startTime = formatTime(value.startTime);
    const endTime = formatTime(value.endTime);
    const dayOfWeek = getDayOfWeek(date);
    let expired;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const dateToCompare = new Date(date);
    dateToCompare.setHours(0, 0, 0, 0);
    if (dateToCompare < currentDate) expired = true;
    else expired = false;
    return { ...value, day: dayOfWeek, startTime, endTime, date, expired };
  });

  formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return formattedData;
};

//function to format Date
export const formatDateToYYYYMMDD = (date) => {
  // Check if the input is a valid Date object
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date");
  }

  // Extract year, month, and day from the input date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Concatenate the parts to create the formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
