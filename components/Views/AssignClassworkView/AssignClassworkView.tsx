import React, { useState } from "react";
import styles from "./assignClassworkview.module.css";
import { GrAttachment } from "react-icons/gr";
import { useAddClasswork } from "@/services/APIs/classwork";
import Button from "@/components/Button/Button";
import { useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AssignClassworkView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const classID = searchParams.get("id");
  const teacherData = useSelector((state) => state?.user?.currentTeacher?.data);
  const {trigger: addClasswork} = useAddClasswork();
  const [payload, setPayload] = useState({
    teacher_id:teacherData?.teacher_id,
    class_id: classID,
    school_id: teacherData?.school?.id,
    name:"",
    media_url:null,
  })

   // HANDLE INPUT FIELDS
   const handleChange = (e) => {
    const data = { ...payload };
    data[e.target.name] = e.target.value;
    setPayload(data);
  };


  // SUBMIT TO API
  const handleSubmit = (e)=>{
    e.preventDefault()
    addClasswork(payload)
  }

  return (
    <>
      <form className={styles.container} onSubmit={(e)=> handleSubmit(e)}>
        <div className={styles.inputwrap}>
          <label htmlFor="classname"> Topic Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter topic name"
            className={styles.input}
            onChange={(e)=>handleChange(e)}
            value={payload?.name}
            required
          />
        </div>

        <label htmlFor="attachIcon" className={styles.attachment}>
          <GrAttachment size={20} />
          <p>Add Attachment</p>
        </label>
        <input
          type="file"
          name="media_url"
          id="attachIcon"
          style={{ display: "none" }}
          onChange={(e)=> setPayload({...payload, media_url: e.target.files[0]})}
        />

        <p>{payload?.media_url?.name}</p>
        <Button width="200px" text="Submit"/>
      </form>
    </>
  );
};

export default AssignClassworkView;
