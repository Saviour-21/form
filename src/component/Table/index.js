import React, { useContext } from "react";
import styles from "./table.module.css"; // Import the CSS file
import { MyContext } from "../../context";

const Table = () => {
  const { formData, setFormData, setEditData, setIsModalVisible } =
    useContext(MyContext);

  const handleDelete = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);
  };

  const handleEdit = (index) => {
    setIsModalVisible((prev) => !prev);
    setEditData({ ...formData[index], index: index });
  };

  return (
    <>
      {formData.length > 0 && (
        <div>
          <table className={styles.myTable}>
            <tr className={styles.header}>
              <th>S.No</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Weekday</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
            {formData.map((item, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.item}>{index + 1}</td>
                <td className={styles.item}>{item.name}</td>
                <td className={styles.item}>{item.contact}</td>
                <td className={styles.item}>{item.email}</td>
                <td className={styles.item}>{item.weekday}</td>
                <td className={styles.item}>{item.gender}</td>
                <td className={styles.item}>{item.dob}</td>
                <td className={styles.item}>
                  <button
                    className={`${styles.button} ${styles.editButton}`}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
