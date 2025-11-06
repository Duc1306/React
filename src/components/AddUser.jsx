import React, { useState } from "react";

function AddUser({ onAdd }) {
  //  Quản lý trạng thái hiển thị form
  const [adding, setAdding] = useState(false);

  //  State quản lý dữ liệu form
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  //  Hàm xử lý khi nhập dữ liệu
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Nếu input nằm trong "address" → cập nhật state lồng nhau
    if (["street", "suite", "city"].includes(id)) {
      setUser({
        ...user,
        address: { ...user.address, [id]: value }, // giữ nguyên address cũ, chỉ thay field cần thiết
      });
    } else {
      setUser({ ...user, [id]: value }); // cập nhật field bình thường
    }
  };

  //  Hàm thêm người dùng mới
  const handleAdd = () => {
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }

    // Gửi dữ liệu người dùng mới lên App thông qua props onAdd
    onAdd(user);

    // Reset form
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });

    setAdding(false);
  };

  return (
    <div className="add-user">
      {/* Nút bật form */}
      <button className="btn-add" onClick={() => setAdding(true)}>
        Thêm người dùng
      </button>

      {/* Nếu adding === true thì hiển thị form */}
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>

            <input
              id="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
            <input
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              id="street"
              placeholder="Street"
              value={user.address.street}
              onChange={handleChange}
            />
            <input
              id="city"
              placeholder="City"
              value={user.address.city}
              onChange={handleChange}
            />
            <input
              id="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
            />
            <div className="modal-buttons">
              <button className="btn-add" onClick={handleAdd}>
                Lưu
              </button>
              <button className="btn-delete" onClick={() => setAdding(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;
