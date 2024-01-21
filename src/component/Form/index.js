import React, { useContext, useEffect, useState } from "react";
import styles from "./form.module.css";
import { MyContext } from "../../context";

const Form = ({ defaultData, isModalVisible }) => {
  const { formData, setFormData, setIsModalVisible } = useContext(MyContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [weekday, setWeekday] = useState([]);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [maxDate,setMaxDate] = useState("");
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      contact,
      weekday,
      gender,
      dob,
    };

    let temp = formData;

    if (isModalVisible) {
      temp[defaultData.index] = data;
      setFormData(temp);
    } else {
      setFormData([...formData, data]);
    }

    resetForm();
    setIsModalVisible(false);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setContact("");
    setWeekday([]);
    setGender("");
    setDob("");
  };

  useEffect(() => {
    const setCheckboxValues = (checkboxes, values) => {
      checkboxes.forEach((checkbox) => {
        if(values.includes(checkbox.value)){
          checkbox.checked = true;
          setWeekday([...weekday, checkbox.value]);
        }
      });
    };

    const setRadioValue = (radios, value) => {
      radios.forEach((radio) => {
        if(value.includes(radio.value)){
          radio.checked = value.includes(radio.value);
          setGender(radio.value);
        }
      });
    };

    if (Object.keys(defaultData || {}).length > 0 && isModalVisible) {
      setName(defaultData.name);
      setEmail(defaultData.email);
      setContact(defaultData.contact);
      setCheckboxValues(
        document.querySelectorAll("#weekday"),
        defaultData.weekday
      );
      setRadioValue(document.querySelectorAll("#gender"), defaultData.gender);
      setDob(defaultData.dob);
    }

    return () => {
      resetForm();
    };
  }, [defaultData, isModalVisible]);

  useEffect(()=>{
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const dd = String(today.getDate()).padStart(2, "0");
    const currentDate = `${yyyy}-${mm}-${dd}`;
    setMaxDate(currentDate);
  },[])
  return (
    <div className={styles.formContainer}>
      <h2>Enter your details</h2>
      <form onSubmit={onSubmitHandler}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            className={styles.inputField}
            placeholder="Name"
            pattern="[a-zA-z ]+"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            className={styles.inputField}
            placeholder="Enter your email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Enter a valid email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Contact Number"
            id="contact"
            pattern="(\+\d{1,2})?[0-9]{10}"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className={ styles.formGroup}>
          <h4>Weekday</h4>
          <div className={styles.weekdayWrapper}>
            {daysOfWeek.map((day) => (
              <div>
                <input
                  type="checkbox"
                  id="weekday"
                  className={styles.checkbox}
                  value={day}
                  checked={weekday.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWeekday([...weekday, day]);
                    } else {
                      setWeekday(
                        weekday.filter((selectedDay) => selectedDay !== day)
                      );
                    }
                  }}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <h4>Gender</h4>
          <div>
            <div>
              <input
                type="radio"
                id="gender"
                name="gender"
                value="Male"
                label="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              <label htmlFor="Male">Male</label>
            </div>

            <div>
              <input
                type="radio"
                id="gender"
                name="gender"
                value="Female"
                label="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              <label htmlFor="Male">Female</label>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <h4>DOB</h4>
          <input
            type="date"
            id="date"
            required
            value={dob}
            max={maxDate}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.btn}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
