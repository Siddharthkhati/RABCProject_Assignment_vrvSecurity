import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUser from './AddUser';
import DeleteUser from './DeletUser';
import UpdatedUser from './UpdatedUser';
import toast from 'react-hot-toast';

export default function Table() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get');
            setUsers(response.data.users);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete/${id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUsers();
            }
        } catch (error) {
            toast.error('Failed to delete user');
            console.error(error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user); 
    };

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>RBAC <b>Project</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                                <span>Add New User</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th> 
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-info"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editEmployeeModal"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddUser refreshUsers={fetchUsers} />
            {editingUser && <UpdatedUser user={editingUser} refreshUsers={fetchUsers} />}
        </div>
    );
}
