import React from "react";
import { Student } from "./StudentDetails";

type Props = {
  onClose: () => void;
  data: Student;
};

const StudentModel = (props: Props) => {
  const { onClose, data } = props;
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg z-10 w-120 text-white">
      <span
        className="close absolute top-4 right-4 text-white cursor-pointer text-2xl"
        onClick={onClose}
      >
        &times;
      </span>
      <div>
        <h3 className="font-bold text-2xl mb-4">Student Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="font-semibold">Student ID:</label>
            <span className="ml-2">{data.id}</span>
          </div>
          <div className="mb-2">
            <label className="font-semibold">First Name:</label>
            <span className="ml-2">{data.firstName}</span>
          </div>
          <div className="mb-2">
            <label className="font-semibold">Last Name:</label>
            <span className="ml-2">{data.lastName}</span>
          </div>
          <div className="mb-2">
            <label className="font-semibold">Date of Birth:</label>
            <span className="ml-2">{data.dateOfBirth}</span>
          </div>
          <div className="mb-2">
            <label className="font-semibold">Email:</label>
            <span className="ml-2">{data.email}</span>
          </div>
          <div className="mb-2">
            <label className="font-semibold">Address:</label>
            <span className="ml-2">
              {data.address.street}, {data.address.city}
            </span>
          </div>
          <div className="mb-2">
            <label className="font-semibold">Department:</label>
            <span className="ml-2">{data.department.departmentName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModel;
