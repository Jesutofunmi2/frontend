import React, { useState } from "react";
import styles from "./classTable.module.css";
import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { RiArrowDownSLine, RiDeleteBin6Line } from "react-icons/ri";
import Button from "@/components/Button/Button";

const DummyData = [
  { id: 1, name: "kohn", age: 30, city: "New York" },
  { id: 2, name: "zane", age: 25, city: "Los Angeles" },
  { id: 3, name: "Bob", age: 35, city: "Chicago" },
  { id: 4, name: "Alice", age: 28, city: "San Francisco" },
];

const ClassTable = ({ body, setArmOpenWithID }) => {
  const [data, setData] = useState(DummyData);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [filterText, setFilterText] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);

  console.log(body);

  const handleSort = (key) => {
    if (sortBy === key) {
      setData([...data].reverse());
      // Toggle sorting order or disable sorting
      if (sortOrder === "ascending") {
        setSortOrder("descending");
      } else if (sortOrder === "descending") {
        setSortOrder(null);
        setData(DummyData);
      } else {
        setSortOrder("ascending");
      }
    } else {
      setData([...data].sort((a, b) => (a[key] < b[key] ? -1 : 1)));
      setSortBy(key);
      setSortOrder("ascending");
    }
  };

  const handleFilter = (e) => {
    const text = e.target.value;
    setFilterText(text);

    const filteredData = DummyData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setData(filteredData);
  };

  const getSortLabel = (key) => {
    if (sortBy === key) {
      return sortOrder === "ascending" ? (
        <BsArrowUp />
      ) : sortOrder === "descending" ? (
        <BsArrowDown />
      ) : (
        <BsArrowDownUp />
      );
    }
    return "";
  };

  const handleOpen = (id) => {
    if (isDropDown === id) {
      setIsDropDown(false);
    } else {
      setIsDropDown(id);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* <input
        type="text"
        placeholder="Filter by Name"
        value={filterText}
        onChange={handleFilter}
        style={{ padding: "5px" }}
      /> */}
        <table>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th></th>
              <th></th>
              <th>No.</th>
              <th
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Class {getSortLabel("name") || <BsArrowDownUp />}
              </th>
              <th className={styles.STATUS}>Language</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {body?.map((item, index) => (
              <React.Fragment key={index}>
                <tr
                  className={styles.compMain}
                  onClick={() => handleOpen(item?.id)}
                >
                  <td>
                    <RiArrowDownSLine
                      className={`${styles.compArrow} ${
                        isDropDown === index && styles.arrowRotate
                      }`}
                    />
                  </td>
                  <td></td>
                  <td> {index + 1}</td>
                  <td>{item.classs_room_name}</td>
                  <td>{item.language}</td>

                  <td>
                    <div className={styles.compUdButtonsWrap}>
                      {/* <AiFillEdit
                      className={styles.compUdButtons}
                      style={{ color: "black" }}
                    /> */}
                      <RiDeleteBin6Line
                        className={styles.compUdButtons}
                        style={{ color: "tomato" }}
                        // onClick={(e) => {
                        //   window.confirm("Delete competition?") &&
                        //     deleteCompetition(competition);
                        // }}
                      />
                    </div>
                  </td>
                </tr>
                {isDropDown === item.id && (
                  <>
                    <tr className={styles.compMB}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={styles.compBlue}>Class arm</td>
                      <td className={styles.compBlue}></td>
                      <td>
                        <button
                          className={styles.compudButtons}
                          onClick={() =>
                            setArmOpenWithID({
                              classID: item.id,
                              languageID: item.language_id,
                            })
                          }
                        >
                          Add class arm
                        </button>
                      </td>
                    </tr>
                    {item?.class_arms.map((item2, idx) => (
                      <tr className={styles.compMB} key={item2.id}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{item2?.name}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClassTable;
