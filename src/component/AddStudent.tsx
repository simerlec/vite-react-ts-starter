import React, { useEffect, useState } from "react";
import axios from "axios";
import { Department, Student } from "./StudentDetails";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  onBackClickHandler: () => void;
  onSubmitClickHandler: (data: Student) => void;
};

const AddStudent = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [departments, setDepartment] = useState([] as Department[]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const { onBackClickHandler, onSubmitClickHandler } = props;

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/departments"
        );
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);
  const onFirstNameChangeHandler = (event: any) => {
    setFirstName(event.target.value);
  };
  const onLastNameChangeHandler = (event: any) => {
    setLastName(event.target.value);
  };
  const onDateOfBirthChangeHandler = (date: Date) => {
    setDateOfBirth(date);
  };
  const onEmailChangeHandler = (event: any) => {
    setEmail(event.target.value);
  };
  const onStreetChangeHandler = (event: any) => {
    setStreet(event.target.value);
  };
  const onCityChangeHandler = (event: any) => {
    setCity(event.target.value);
  };
  const onDepartmentChangeHandler = (event: any) => {
    setSelectedDepartment(event.target.value);
  };

  const onSubmitBtnClickHandler = async (event: any) => {
    event.preventDefault();
    const data: Student = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      email: email,
      address: {
        street: street,
        city: city,
      },
      department: {
        id: parseInt(selectedDepartment),
        departmentName: "",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/students",
        data
      );
      console.log("Student added successfully", response.data);
      onSubmitClickHandler(response.data);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 shadow-md rounded-md bg-blue-200"
      onSubmit={onSubmitBtnClickHandler}
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">First Name</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={onFirstNameChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Last Name</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={onLastNameChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">E-Mail</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Date of Birth</label>
        <ReactDatePicker
          className="w-full p-2 border border-gray-300 rounded-md"
          selected={dateOfBirth}
          onChange={onDateOfBirthChangeHandler}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Street</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your street"
          value={street}
          onChange={onStreetChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">City</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={onCityChangeHandler}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Department</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedDepartment}
          onChange={onDepartmentChangeHandler}
        >
          <option value="">Select Department</option>
          {departments.map((department) => {
            return (
              <option key={department.id} value={department.id}>
                {department.departmentName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-700 cursor-pointer"
          onClick={onBackClickHandler}
        >
          Back
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
          Submit
        </button>
      </div>
    </form>
  );
};
export default AddStudent;
