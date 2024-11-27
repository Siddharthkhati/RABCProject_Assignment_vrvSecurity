import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UpdatedUser({ user, refreshUsers }) {
    const [value, setValue] = useState({ ...user }); 
    

    useEffect(() => {
        setValue({ ...user }); 
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/update/${value._id}`, value);
            if (response.data.success) {
                toast.success('User updated successfully');
                refreshUsers(); 
                const modalElement = document.getElementById('editEmployeeModal');
                const modal = new window.bootstrap.Modal(modalElement);
                modal.hide();
            }
        } catch (error) {
            toast.error('Failed to update user');
            console.error(error);
        }
    };

    return (
        <div id="editEmployeeModal" className="modal fade" tabIndex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleOnSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="editEmployeeModalLabel">Edit User</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={value.name || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={value.email || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    name="role"
                                    value={value.role || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={value.status || 'active'}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
