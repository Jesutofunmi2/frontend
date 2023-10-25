"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";
import userIcon from "/public/assets/images/userIcon.png";
import Link from "next/link";




const Register = () => {
  const [Type, setType] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null)

  const handleType = (e) => {
    setType(e.target.value);
  };



  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      setFile(selected);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* LOGO */}
        <Image
          src="/assets/images/logo.png"
          width="128"
          height="150"
          alt="logo"
          className={styles.logo}
        />

        <form>
          <p>Create an acco</p>

          {/* SELECT PHOTO*/}
          <div>
            <label htmlFor="imgInput">
              {preview ? (
                <Image
                  src={preview}
                  width="100"
                  height="100"
                  alt="logo"
                  className={styles.userPhoto}
                />
              ) : (
                <Image src={userIcon} alt="logo" className={styles.userIcon} />
              )}
            </label>
            <input
              type="file"
              id="imgInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          
          <div className={styles.formContainer}>
            {/* USER ACCOUNT FIELDS */}
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />

            {/* SELECT ACCOUNT TYPE */}
            <select onChange={(e) => handleType(e)}>
              <option value="">Account Type</option>
              <option value="user">User</option>
              <option value="school">School</option>
            </select>

            {/* IF SELECTED ACOUNT TYPE IS SCHOOL, SHOW SCHOOL FIELDS*/}
            {Type === "school" && (
              <>
                {/* NATIONALITY */}
                <input type="text" placeholder="Nationality" />

                {/* DATE */}
                <input type="date" name="" id="" />

                {/*MARITAL STATUS */}
                <select>
                  <option value="">Marital Status</option>
                  <option value="user">Single</option>
                  <option value="school">Married</option>
                  <option value="school">Other</option>
                </select>

                {/* COUNTRY */}
                <select>
                  <option value="">Country</option>
                  <option value="user">Single</option>
                </select>

                {/* ETHNICITY */}
                <select>
                  <option value="">Ethnicity</option>
                  <option value="user">Single</option>
                </select>

                {/* SELECT GENDER */}
                <div className={styles.selectGender}>
                  <div style={{ marginBottom: "10px" }}>Choose Your Gender</div>
                  <div className="addComp-radioWrap">
                    <div className="addComp-radio">
                      <input
                        type="radio"
                        id="audience"
                        name="audience"
                        style={{ height: "15px", width: "15px" }}
                        // checked={audience === "adult"}
                        required
                      />
                      <label htmlFor="j">Male</label>
                    </div>

                    <div className="addComp-radio">
                      <input
                        type="radio"
                        id="audience"
                        name="audience"
                        style={{ height: "15px", width: "15px" }}
                        // onChange={() => setAudience("child")}
                        // checked={audience === "child"}
                        required
                      />
                      <label htmlFor="j">Female</label>
                    </div>
                  </div>
                </div>

                {/* HOW YOU HEARD ABOUT US*/}
                <div className={styles.selectGender}>
                  <div style={{ marginBottom: "10px" }}>
                    How did you hear about us?
                  </div>
                  <div className="addComp-radioWrap">
                    <div className="addComp-radio">
                      <input
                        type="radio"
                        id="audience"
                        name="audience"
                        style={{ height: "15px", width: "15px" }}
                        // checked={audience === "adult"}
                        required
                      />
                      <label htmlFor="j">Facebook</label>
                    </div>

                    <div className="addComp-radio">
                      <input
                        type="radio"
                        id="audience"
                        name="audience"
                        style={{ height: "15px", width: "15px" }}
                        // onChange={() => setAudience("child")}
                        // checked={audience === "child"}
                        required
                      />
                      <label htmlFor="j">Instagram</label>
                    </div>

                    <div className="addComp-radio">
                      <input
                        type="radio"
                        id="audience"
                        name="audience"
                        style={{ height: "15px", width: "15px" }}
                        // onChange={() => setAudience("child")}
                        // checked={audience === "child"}
                        required
                      />
                      <label htmlFor="j">Referral</label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* SIGN UP BUTTON */}
            <div className={styles.btnWrap}>
              <button className={styles.loginBtn}>Sign Up</button>
              <p>
                Already have an account?{" "}
                <Link href="/login" style={{ textDecoration: "underline" }}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
