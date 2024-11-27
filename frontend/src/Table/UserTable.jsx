import React, { useState, useEffect } from 'react';
import Table from '../Component/Table';
import AddUser from '../Component/AddUser';
import UpdatedUser from '../Component/UpdatedUser';
import DeletUser from '../Component/DeletUser';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserTable() {
    const [userId, setUserId] = useState();
    const [updatedUserId, setUpdatedUserId] = useState();
    const [value, setValue] = useState({
        name: "",
        fathername: "",
        email: "",
        phone: "",
        role: "",
        status: ""
    });

    const [users, setUsers] = useState([]);
    
    const currentUserRole = 'admin'; 

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users'); 
                setUsers(response.data); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const deletuser = (userid) => {
        setUserId(userid);
    };

    const handleUserDelet = async () => {
        try {
            const DeletUser = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
            const response = DeletUser.data;
            if (response.success) {
                toast.success(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const UpadteUserData = async (Updatedid, role) => {
        // Only allow admins to edit teacher or student
        if (currentUserRole === 'admin' || (currentUserRole === 'teacher' && role === 'student')) {
            setUpdatedUserId(Updatedid);

            // Fetch user data and populate modal fields
            try {
                const response = await axios.get(`http://localhost:8000/api/user/${Updatedid}`);
                const userData = response.data;
                if (userData) {
                    setValue({
                        name: userData.name,
                        fathername: userData.fathername,
                        email: userData.email,
                        phone: userData.phone,
                        role: userData.role,
                        status: userData.status
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("You cannot edit this user's details.");
        }
    };

    const handleOnSubmit = async () => {
    try {
        // Ensure you're passing the user ID and the updated values
        const response = await axios.put(
            `http://localhost:8000/api/update/${value._id}`, 
            value
        );

        if (response.data.success) {
            toast.success(response.data.message);
            fetchUsers(); // Refresh the list of users after updating
            setEditingUser(null); // Close the modal after successful update
        }
    } catch (error) {
        toast.error('Failed to update user');
        console.error(error);
    }
};


    return (
        <>
            <Table
                users={users}  
                deleteUser={deletuser}
                updateUser={UpadteUserData}
                currentUserRole={currentUserRole}
            />
            <DeletUser deletUser={handleUserDelet} />
            <UpdatedUser handleOnSubmit={handleOnSubmit} value={value} setValue={setValue} />
        </>
    );
}
