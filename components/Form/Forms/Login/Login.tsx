"use client";

import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {
  useLoginSchool,
  useLoginStudent,
  useLoginTeacher,
} from "@/services/APIs/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const { trigger: schoolLogin, isMutating } = useLoginSchool();
  const { trigger: studentLogin } = useLoginStudent();
  const { trigger: teacherLogin } = useLoginTeacher();
  const [toggle, setToggle] = useState("school");
  const [inputType, setInputType] = useState("password");
  const [studentData, setStudentData] = useState({
    login_id: "",
    password: "12345678",
  });
  const [teacherData, setTeacherData] = useState({
    teacher_id: "",
    password: "12345678",
  });
  const [schoolData, setschoolData] = useState({
    email: "",
    password: "",
  });

  // TOGGLE USERS
  const handleToggle = (event) => {
    setToggle(event);
  };

  const revealPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };

  // HANDLE INPUT FIELDS
  const handleChange = (e) => {
    const data = { ...schoolData };
    data[e.target.name] = e.target.value;
    setschoolData(data);
  };

  // SUBMIT LOGIN CONDITION
  const handleSubmit = (e) => {
    console.log(teacherData)
    e.preventDefault();
    if (toggle === "school") {
      schoolLogin(schoolData);
    } else if (toggle === "teacher") {
      teacherLogin(teacherData);
    } else if (toggle === "student") {
      studentLogin(studentData);
    }
  };

  return (
    <>
      <div className={styles.card}>
        {/* LOGO */}
        <Image
          src="/assets/images/logo.png"
          width="80"
          height="80"
          alt="logo"
          className={styles.logo}
        />

        <div className={styles.loginAndToggle}>
          <h3>Login</h3>

          {/* TOOGLE BUTTONS */}
          <div className={styles.toggleBtn}>
            
            {/* school button */}
            <button
              className={toggle === "school" ? styles.btnActive : null}
              onClick={() => handleToggle("school")}
            >
              School
            </button>

            {/* student button */}
            <button
              className={toggle === "student" ? styles.btnActive : null}
              onClick={() => handleToggle("student")}
            >
              Student
            </button>

            {/* teacher button */}
            <button
              className={toggle === "teacher" ? styles.btnActive : null}
              onClick={() => handleToggle("teacher")}
            >
              Teacher
            </button>   
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          {/* SIGN IN INPUT */}
          <p>Sign in to your account to continue </p>

          {toggle === "school" ? (
            // IF TOGGLE IS EQUAL TO SCHOOL, SHOW EMAIL AND PASSWORD INPUT
            <>
              <span className={styles.inputWrap}>
                <input
                  defaultValue={schoolData.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                  className={styles.inputfield}
                />
              </span>
              <span className={styles.inputWrap}>
                <input
                  defaultValue={schoolData.password}
                  type={inputType}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  className={styles.inputfield}
                />
                {inputType === "password" ? (
                  <AiOutlineEye
                    className={styles.revealIcon}
                    onClick={() => revealPassword()}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={styles.revealIcon}
                    onClick={() => revealPassword()}
                  />
                )}
              </span>
            </>
          ) : toggle === "student" ? (
            // ELSE FOR ONLY LOGIN ID INPUT
            <>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentData.login_id}
                  onChange={(e) =>
                    setStudentData({
                      ...studentData,
                      login_id: e.target.value,
                    })
                  }
                  className={styles.inputfield}
                />
              </div>
            </>
          ) : toggle === "teacher" && (
            <>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  placeholder="Teacher ID"
                  value={teacherData.teacher_id}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
                      teacher_id :e.target.value,
                    })
                  }
                  className={styles.inputfield}
                />
              </div>
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" className={styles.loginBtn}>
            Sign in
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginForm;
