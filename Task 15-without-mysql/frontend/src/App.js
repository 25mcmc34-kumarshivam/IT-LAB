import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/users";

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = async () => {
    if (!name) return;

    if (editId) {
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      const updated = await res.json();
      setUsers(users.map(u => (u.id === editId ? updated : u)));
      setEditId(null);
    } else {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      const newUser = await res.json();
      setUsers([...users, newUser]);
    }

    setName("");
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u.id !== id));
  };

  const editUser = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Manager</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <input
        style={styles.search}
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.list}>
        {filteredUsers.map(user => (
          <div key={user.id} style={styles.item}>
            <span>{user.name}</span>

            <div>
              <button
                style={styles.editBtn}
                onClick={() => editUser(user)}
              >
                Edit
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Simple clean styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif"
  },

  heading: {
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },

  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },

  button: {
    padding: "8px 12px",
    border: "none",
    background: "#333",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer"
  },

  search: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "15px"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px"
  },

  editBtn: {
    marginRight: "5px",
    padding: "5px 8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer"
  },

  deleteBtn: {
    padding: "5px 8px",
    border: "none",
    background: "#f44336",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer"
  }
};