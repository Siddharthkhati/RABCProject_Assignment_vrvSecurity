import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser({ refreshUsers }) {
    const [value, setValue] = useState({
        name: '',
        email: '',
        role: 'student', 
    });

    const closeRef = useRef();

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/create', { ...value, status: 'active' });
            if (response.data.success) {
                toast.success(response.data.message);

                setValue({ name: '', email: '', role: 'student' });

                closeRef.current.click();

                refreshUsers();
            }
        } catch (error) {
            toast.error('Failed to add user');
            console.error(error);
        }
    };

    return (
        <div id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Add User</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-hidden="true"
                                ref={closeRef}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={value.name}
                                    name="name"
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={value.email}
                                    name="email"
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    value={value.role}
                                    name="role"
                                    onChange={handleOnChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
