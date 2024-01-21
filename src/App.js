import "./App.css";
import Form from "./component/Form";
import { useContext } from "react";
import { MyContext } from "./context";
import Table from "./component/Table";
import Modal from "./component/Modal";

function App() {
  const {isModalVisible} = useContext(MyContext);
  return (
    <>
      <div className="App">
        {!isModalVisible ? (
          <>
            <Form />
            <Table/>
          </>
        ) : (
          <Modal/>
        )}
      </div>
    </>
  );
}

export default App;
