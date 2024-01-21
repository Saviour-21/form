import { createContext, useReducer } from "react";

const initialState = {
  formData: [],
  editData: {},
  isModalVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    case "SET_EDIT_DATA":
      return { ...state, editData: action.payload };
    case "SET_MODAL_VISIBILITY":
      return { ...state, isModalVisible: action.payload };
    default:
      return state;
  }
};

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setFormData = (formData) => {
    dispatch({ type: "SET_FORM_DATA", payload: formData });
  };

  const setEditData = (editData) => {
    dispatch({ type: "SET_EDIT_DATA", payload: editData });
  };

  const setIsModalVisible = (isModalVisible) => {
    dispatch({ type: "SET_MODAL_VISIBILITY", payload: isModalVisible });
  };

  const contextValue = {
    formData: state.formData,
    setFormData,
    editData: state.editData,
    setEditData,
    isModalVisible: state.isModalVisible,
    setIsModalVisible,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
