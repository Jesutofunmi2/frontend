import React from "react";
import styles from "./addEditUsers.module.css";
import TextInput from "../../FormFields/TextInput/TextInput";
import Button from "@/components/Button/Button";

const AddEditUsers = () => {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Add User</h3>
        <hr />

        <div className={styles.inputWrap}>
          <TextInput title="Name" />
          <TextInput title="Username" />
          <TextInput title="Email" />
          <TextInput title="Password" />
          <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditUsers;
