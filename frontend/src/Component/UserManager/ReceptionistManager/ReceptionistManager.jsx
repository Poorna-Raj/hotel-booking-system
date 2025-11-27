import "./ReceptionistManager.css";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#E74C3C",
      color: "#fff",
      fontWeight: "600",
      fontSize: "0.95rem",
      borderRadius: "12px 12px 0 0",
      minHeight: "56px",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      fontSize: "0.95rem",
      fontWeight: "600",
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      fontSize: "0.95rem",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#FFE6E6",
        transform: "scale(1.01)",
        boxShadow: "0 2px 8px rgba(231, 76, 60, 0.15)",
      },
    },
    stripedStyle: {
      backgroundColor: "#FFF5F5",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#FDEDEC",
      borderRadius: "0 0 12px 12px",
      minHeight: "56px",
      borderTop: "1px solid #E74C3C",
    },
    pageButtonsStyle: {
      borderRadius: "8px",
      height: "36px",
      width: "36px",
      padding: "8px",
      margin: "0 4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      color: "#E74C3C",
      fill: "#E74C3C",
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "not-allowed",
        color: "#ccc",
        fill: "#ccc",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "#E74C3C",
        color: "#fff",
        fill: "#fff",
      },
    },
  },
};

function ReceptionistManager() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchReceptionists = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/user-service/receptionists"
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching receptionists data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceptionists();
  }, []);

  const handleEdit = (row) => {
    setSelectedUser(row);
    setEditForm({
      name: row.name,
      email: row.email,
      address: row.address,
    });
    setShowEditModal(true);
  };

  const handleDelete = (row) => {
    setSelectedUser(row);
    setShowDeleteModal(true);
  };

  const confirmEdit = async () => {
    setIsLoading(true);
    try {
      // API call to update user
      const response = await fetch(
        `http://localhost:8080/user-service/receptionists/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editForm.name,
            email: editForm.email,
            address: editForm.address,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      setData(
        data.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: editForm.name,
                email: editForm.email,
                address: editForm.address,
              }
            : user
        )
      );

      setShowEditModal(false);
      setSelectedUser(null);

      // Optional: Show success message
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      // API call to delete user
      const response = await fetch(
        `http://localhost:8080/user-service/receptionists/${selectedUser.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setData(data.filter((user) => user.id !== selectedUser.id));

      setShowDeleteModal(false);
      setSelectedUser(null);

      // Optional: Show success message
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 1,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 2,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      grow: 2,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <button className="btn-edit" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => handleDelete(row)}>
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: "180px",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      item.id.toString().includes(filterText) ||
      item.address.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
    <div className="admin-manager-container">
      <div className="search-section">
        <div className="search-box">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          {filterText && (
            <button onClick={handleClear} className="clear-button">
              ×
            </button>
          )}
        </div>
        <div className="results-count">
          Showing {filteredData.length} of {data.length} users
        </div>
      </div>

      <div className="table-container">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          customStyles={customStyles}
          highlightOnHover
          striped
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8, 15, 25, 50]}
          noDataComponent={
            <div className="no-data">
              <p>No users found matching your search criteria</p>
            </div>
          }
        />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit User</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={closeModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={confirmEdit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal modal-small"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete{" "}
                <strong>{selectedUser?.name}</strong>?
              </p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={closeModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn-confirm btn-danger"
                onClick={confirmDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceptionistManager;
