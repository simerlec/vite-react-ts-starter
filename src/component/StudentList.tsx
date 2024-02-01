import React, { useState } from "react";
import { Student } from "./StudentDetails";
import StudentModel from "./StudentModel";
type Props = {
  students: Student[];
  onDeletelickHandler: (data: Student) => void;
  onEditClickHandler: (data: Student) => void;
};

const StudentList = (props: Props) => {
  const { students, onDeletelickHandler, onEditClickHandler } = props;
  const [showModal, setShowModal] = useState(false);
  const viewStudent = (data: Student) => {
    setDataToShow(data);
    setShowModal(true);
  };
  const onCloseModel = () => setShowModal(false);
  const [dataToShow, setDataToShow] = useState(null as Student | null);

  return (
    <div>
      <article className="flex items-center justify-center text-2xl font-bold">
        <h3>Students Details</h3>
      </article>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-solid border-gray-300 text-left px-8 py-2">
              Name
            </th>
            <th className="border border-solid border-gray-300 text-left px-8 py-2">
              Email
            </th>
            <th className="border border-solid border-gray-300 text-left px-8 py-2">
              Department
            </th>
            <th className="border border-solid border-gray-300 text-left px-8 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            console.log(student);
            return (
              <tr className="bg-gray-100" key={student.id}>
                <td className="border border-solid border-gray-300 text-left px-8 py-2">{`${student.firstName} ${student.lastName}`}</td>
                <td className="border border-solid border-gray-300 text-left px-8 py-2">
                  {student.email}
                </td>
                <td className="border border-solid border-gray-300 text-left px-8 py-2">
                  {student.department.departmentName}
                </td>
                <td className="border border-solid border-gray-300 text-left px-8 py-2">
                  <div>
                    <input
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 w-20 rounded-md mr-2 cursor-pointer"
                      type="button"
                      value="view"
                      onClick={() => viewStudent(student)}
                    />
                    <input
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 w-20 rounded-md mr-2 cursor-pointer"
                      type="button"
                      value="Edit"
                      onClick={() => onEditClickHandler(student)}
                    />
                    <input
                      className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 w-20 rounded-md mr-2 cursor-pointer"
                      type="button"
                      value="Delete"
                      onClick={() => onDeletelickHandler(student)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && dataToShow !== null && (
        <StudentModel onClose={onCloseModel} data={dataToShow} />
      )}
    </div>
  );
};

export default StudentList;
