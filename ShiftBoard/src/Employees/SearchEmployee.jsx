const SearchEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    contactNumber: "",
    externalId: "",
    departmentId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Message:</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="contactNumber">Message:</label>
        <input
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <label htmlFor="externalId">Message:</label>
        <input
          id="externalId"
          name="externalId"
          value={formData.externalId}
          onChange={handleChange}
        />

        <label>
          Select an Department:
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchEmployee;
