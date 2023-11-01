import React from "react";
import styles from "./assignModuleView.module.css";
import Select2 from "@/components/Form/FormFields/Select/select2";
import AddModuleForm from "@/components/Form/Forms/AddModuleForm/AddModuleForm";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { useGetLessons } from "@/services/api/lessons";
import AssignCard from "@/components/Card/AssignCard/AssignCard";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { useAddModule } from "@/services/api/module";
import { userData } from "@/services/redux/features/userSlice";

const AssignModuleView = ({}) => {
  const teacherData = useSelector(userData).currentTeacher?.data!
  // const IDs = useSelector((state) => state?.user?.currentTeacher?.data);
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  const classID = searchParams.get("id");
  const { data } = useGetLessons();
  const [addedModule, setAddedModule] = useState([]);
  const [selectedModule, setSelectedModule] = useState(false);
  const { trigger } = useAddModule();
  const [payload, setPayload] = useState({
    school_id: `${IDs?.school?.id}`,
    teacher_id: `${IDs?.teacher_id}`,
    class_id: classID,
    data: [],
  });

  // Options for Select component
  const options = data?.data?.map((item) => {
    return { value: item, label: item?.title };
  });

  // Handle remove card
  const handleRemoveCard = (param) => {
    setAddedModule((current) => current.filter((item) => item.id !== param.id));
  };

  // Handle Submit
  const handleSubmit = () => {
    trigger(payload);
  };

  // HANDLE ADD
  const handleAdd = (formdata) => {
    const alreadyExisting = addedModule.find(
      (item) => item.id === selectedModule?.id
    );
    if (alreadyExisting) {
      alert("already exist");
    } else {
      const data = { ...payload };
      data["data"].push({
        module: selectedModule.id,
        deadline: formdata?.date,
        time: formdata?.time,
        no_attempt: formdata?.no_attempt,
        mark: formdata?.mark,
      });
      setPayload(data);
      setAddedModule((current) => [...current, selectedModule]);
      setSelectedModule(false);
    }
  };

  return (
    <>
      <div>
        <Select2
          options={options}
          title="SELECT MODULE"
          setSelectedModule={setSelectedModule}
        />
        <p className={styles.selectModuleTitle}></p>
        {/* <ModulesSection
          selectModule={selectModule}
          setselectModule={setselectModule}
          data={data}
          isValidating={isValidating}
        /> */}
        {addedModule.length > 0 ? (
          <div className={styles.cardWrap}>
            {addedModule?.map((item) => (
              <AssignCard
                item={item}
                key={item.id}
                handleDelete={handleRemoveCard}
              />
            ))}
          </div>
        ) : null}

        {addedModule.length > 0 ? (
          <Button text="Submit" width="200px" handleClick={handleSubmit} />
        ) : null}
      </div>

      <Modal open={selectedModule ? true : false} setOpen={setSelectedModule}>
        <AddModuleForm handleClick={handleAdd} />
      </Modal>
    </>
  );
};

export default AssignModuleView;
