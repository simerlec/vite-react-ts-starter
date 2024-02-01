import { useState } from "react";
import { Student } from "./StudentDetails";
import axios from "axios";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  data: Student;
  onBackClickHandler: () => void;
  onUpdateClickHandler: (data: Student) => void;
};
const EditStudent = (props: Props) => {
  const { data, onBackClickHandler, onUpdateClickHandler } = props;
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(data.dateOfBirth));
  const [email, setEmail] = useState(data.email);
  const [street, setStreet] = useState(data.address.street);
  const [city, setCity] = useState(data.address.city);

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
  const onSubmitBtnClickHandler = async (event: any) => {
    event.preventDefault();
    const updatedData: Student = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      email: email,
      address: {
        id: data.address.id,
        street: street,
        city: city,
      },
      id: data.id,
      department: data.department,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/api/students/${data.id}`,
        updatedData
      );
      onUpdateClickHandler(updatedData);
      onBackClickHandler();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  return (
    <div>
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
          <label className="block text-sm font-bold mb-2">Date of Birth</label>
          <ReactDatePicker
            className="w-full p-2 border border-gray-300 rounded-md"
            selected={dateOfBirth}
            onChange={onDateOfBirthChangeHandler}
            dateFormat="yyyy-MM-dd"
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
          <label className="block text-sm font-bold mb-2">Address</label>
          <div className="mb-2">
            <label className="block text-sm mb-2">Street</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Enter your street"
              value={street}
              onChange={onStreetChangeHandler}
              name="street"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">City</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={onCityChangeHandler}
              name="city"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-700 cursor-pointer"
            onClick={onBackClickHandler}
          >
            Back
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
            Update Student
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditStudent;
