// src/components/Home.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageEnum, Student } from "./StudentDetails";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

const Home: React.FC = () => {
  const [students, setStudents] = useState([] as Student[]);
  const [shownPage, setShownPage] = useState(PageEnum.StudentList);
  const [dataToEdit, setDataToEdit] = useState({} as Student);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchData();
  }, []);

  const onAddStudentClickHandler = () => {
    setShownPage(PageEnum.StudentCreate);
  };
  const showStudentList = () => {
    setShownPage(PageEnum.StudentList);
  };
  const _setStudentList = (students: Student[]) => {
    setStudents(students);
    window.localStorage.setItem("students", JSON.stringify(students));
    console.log(localStorage.getItem("students"));
  };
  const addStudent = async (data: Student) => {
    try {
      console.log(data);
      _setStudentList([...students, data]);
      showStudentList();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  const deleteStudent = async (data: Student) => {
    const userConfirmed = window.confirm("Are you sure you want to delete?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/students/${data.id}`);
        setStudents(students.filter((student) => student.id !== data.id));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };
  const editStudent = async (data: Student) => {
    setShownPage(PageEnum.StudentEdit);
    setDataToEdit(data);
  };
  const updateStudent = (data: Student) => {
    const filteredStudents = students.find((student) => student.id === data.id);
    const indexOfStudent = students.indexOf(filteredStudents as Student);
    const updatedStudents = [...students];
    updatedStudents[indexOfStudent] = data;
    _setStudentList(updatedStudents);
  };

  return (
    <>
      <article className="pt-4">
        <header className="text-5xl mb-8 text-yellow-500 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-800 py-6 text-center">
          <h1>Retro: Student Management System</h1>
        </header>
      </article>
      <section className="mx-10 my-15px">
        {shownPage === PageEnum.StudentList && (
          <>
            <div className="flex items-center justify-end">
              <input
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2 cursor-pointer"
                type="button"
                value="Add Student"
                onClick={onAddStudentClickHandler}
              />
            </div>
            <StudentList
              students={students}
              onDeletelickHandler={deleteStudent}
              onEditClickHandler={editStudent}
            />
          </>
        )}
        {shownPage === PageEnum.StudentCreate && (
          <AddStudent
            onBackClickHandler={showStudentList}
            onSubmitClickHandler={addStudent}
          />
        )}
        {shownPage === PageEnum.StudentEdit && (
          <EditStudent
            data={dataToEdit}
            onBackClickHandler={showStudentList}
            onUpdateClickHandler={updateStudent}
          />
        )}
      </section>
    </>
  );
};

export default Home;
