import React, { useEffect, useState } from "react";
import axios from "axios";
import { Department, Student } from "./StudentDetails";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "../Validations/UserValidation";

type Props = {
  onBackClickHandler: () => void;
  onSubmitClickHandler: (data: Student) => void;
};

const AddStudent = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserValidation),
  });
  const [departments, setDepartment] = useState([] as Department[]);
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

  const onSubmitBtnClickHandler = async (data: FieldValues) => {
    try {
      data.dateOfBirth = data.dateOfBirth.toISOString().split("T")[0];
      console.log("data", data);
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
      onSubmit={handleSubmit(onSubmitBtnClickHandler)}
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">First Name</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your first name"
          //value={firstName}
          //onChange={onFirstNameChangeHandler}
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className="text-red-500 text-xs">
            {errors.firstName.message?.toString()}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Last Name</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your last name"
          //value={lastName}
          //onChange={onLastNameChangeHandler}
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="text-red-500 text-xs">
            {errors.lastName.message?.toString()}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">E-Mail</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your email"
          //value={email}
          //onChange={onEmailChangeHandler}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message?.toString()}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Date of Birth</label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <ReactDatePicker
              className="w-full p-2 border border-gray-300 rounded-md"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy-MM-dd"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Street</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your street"
          //value={street}
          //onChange={onStreetChangeHandler}
          {...register("street")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">City</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter your city"
          //value={city}
          //onChange={onCityChangeHandler}
          {...register("city")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Department</label>
        <Controller
          control={control}
          name="department.id"
          render={({ field }) => (
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          )}
        />
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
