"use client";

import React, { useEffect } from "react";
import styles from "./videoCourseSidebar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { TbPlayerPlay } from "react-icons/tb";
import { useState } from "react";

const VideoCourseSidebar = ({ data, setVideoData, setQuestionIndex , setQuestionsPopup}) => {
  const [dropdown, setDropdown] = useState(false);

  const handleToggle = (id) => {
    if (dropdown === id) {
      setDropdown(false);
    } else {
      setDropdown(id);
    }
  };

  const handleVideoSelect = (arg) => {
    setVideoData(arg)
    setQuestionIndex(0)
    setQuestionsPopup(false)
  };



  return (
    <>
      <div className={styles.container}>
        <h3>Course content</h3>

        {data?.data?.map((item) => (
          <div className={styles.listContainer} key={item.id}>
            <ul
              className={styles.listWrap}
              onClick={() => handleToggle(item.id)}
            >
              <li className={styles.list}>
                <div className={styles.titleWrap}>
                  <span className={styles.title}>{item.title}</span>
                  {/* <span className={styles.videoTime}>4 min</span> */}
                </div>
                <IoIosArrowDown size={20} />
              </li>
            </ul>
            {dropdown === item.id ? (
              <ul className={styles.dropwrap}>
                {item?.topics?.map((tpc) => (
                  <li
                    className={styles.dropListWrap}
                    key={tpc.id}
                    onClick={() => handleVideoSelect(tpc)}
                  >
                    <div className={styles.dropTitleWrap}>
                      <span>•</span>
                      <span className={styles.dropText}>{tpc.title}</span>
                    </div>
                    {/* <span className={styles.dropVideoTime}>
                      <TbPlayerPlay />
                      5min
                    </span> */}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCourseSidebar;
