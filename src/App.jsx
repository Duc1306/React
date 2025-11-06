import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";
import "./App.css";

function App() {
  //  State lưu từ khóa tìm kiếm
  const [kw, setKeyword] = useState("");

  //  State lưu thông tin người dùng mới được thêm
  const [newUser, setNewUser] = useState(null);

  return (
    <div className="container">
      <h1>Quản lý người dùng</h1>

      {/* Nhận từ khóa từ SearchForm */}
      <SearchForm onChangeValue={setKeyword} />

      {/* Nhận dữ liệu người dùng mới từ AddUser */}
      <AddUser onAdd={setNewUser} />

      {/* Truyền state và hàm xuống ResultTable */}
      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)} // reset sau khi thêm xong
      />
    </div>
  );
}

export default App;
