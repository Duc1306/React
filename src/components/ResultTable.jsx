import React, { useEffect, useState } from "react";

function ResultTable({ keyword, user, onAdded }) {
  //  State chứa danh sách người dùng
  const [users, setUsers] = useState([]);

  //  State hiển thị loading khi đang tải dữ liệu
  const [loading, setLoading] = useState(true);

  //  State lưu người dùng đang được sửa
  const [editing, setEditing] = useState(null);

  //  useEffect: gọi API 1 lần khi component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  //  Khi có user mới được thêm từ AddUser → thêm vào danh sách
  useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user]);

  //  Lọc danh sách theo keyword
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  //  Xoá user
  const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  //  Khi nhấn nút Sửa
  function editUser(user) {
    // Deep copy để tránh sửa trực tiếp object gốc
    setEditing({ ...user, address: { ...user.address } });
  }

  //  Cập nhật state editing khi người dùng sửa input
  function handleEditChange(field, value) {
    if (["street", "suite", "city"].includes(field)) {
      // cập nhật phần address
      setEditing({
        ...editing,
        address: { ...editing.address, [field]: value },
      });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  }

  //  Lưu lại sau khi chỉnh sửa
  function saveUser() {
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  }

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <>
      <h3>Danh sách người dùng</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address?.city || "—"}</td>
              <td>
                <button className="btn-edit" onClick={() => editUser(u)}>
                  Sửa
                </button>
                <button className="btn-delete" onClick={() => removeUser(u.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  Modal chỉnh sửa */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Chỉnh sửa người dùng</h4>

            <input
              id="name"
              value={editing.name || ""}
              onChange={(e) => handleEditChange("name", e.target.value)}
              placeholder="Name"
            />
            <input
              id="username"
              value={editing.username || ""}
              onChange={(e) => handleEditChange("username", e.target.value)}
              placeholder="Username"
            />
            <input
              id="email"
              value={editing.email || ""}
              onChange={(e) => handleEditChange("email", e.target.value)}
              placeholder="Email"
            />
            <input
              id="street"
              value={editing.address?.street || ""}
              onChange={(e) => handleEditChange("street", e.target.value)}
              placeholder="Street"
            />
            <input
              id="city"
              value={editing.address?.city || ""}
              onChange={(e) => handleEditChange("city", e.target.value)}
              placeholder="City"
            />

            <div className="modal-buttons">
              <button className="btn-add" onClick={saveUser}>
                Lưu
              </button>
              <button className="btn-delete" onClick={() => setEditing(null)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResultTable;
