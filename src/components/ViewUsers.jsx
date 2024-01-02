import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "./main/Header";
import DeleteIcon from '@mui/icons-material/Delete';


function ChangeUserRole(role, username, setUsers) {
    const updatedUserFan = {
        role: 'Fan',
    };
    const updatedUserManager = {
        role: 'Manager',
    };

    let confirmationMessage = '';
    let updatedRole = '';

    if (role === 'Fan') {
        confirmationMessage = 'Do you want to change User Role to Manager?';
        updatedRole = 'Manager';
    } else if (role === 'Manager') {
        confirmationMessage = 'Do you want to change User Role to Fan?';
        updatedRole = 'Fan';
    }

    const result = window.confirm(confirmationMessage);

    if (result) {
        fetch(`http://localhost:3000/users/${username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role === 'Fan' ? updatedUserManager : updatedUserFan),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update user role: ${response.statusText}`);
                }
                return response.json();
            })
            .then((updatedUser) => {
                // Update the local state to reflect the change
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.userName === username ? { ...user, role: updatedRole } : user
                    )
                );
                console.log(`User role updated: ${JSON.stringify(updatedUser)}`);
            })
            .catch((error) => {
                console.error('Error updating user role:', error);
            });
    }
}



function ViewUsers() {

    const [users, setUsers] = useState([]);

    async function deleteUser(deletedUsername) {
        const response = await fetch(`http://localhost:3000/users/${deletedUsername}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('User deleted successfully');
            // Refresh the user list after successful deletion
            logUsers();
        } else {
            alert('Failed to delete user');
        }
    }

    async function logUsers() {
        const response = await fetch("http://localhost:3000/users");
        const usersData = await response.json();
        setUsers(usersData);
    }

    useEffect(() => {
        logUsers();
    }, []);
    
    return (
        <div>
            <ResponsiveAppBar />
            <div className='stadiumtable'>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th className='cityandLocation'>Role</th>
                            <th className='cityandLocation'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.userName}</td>

                               
                                <td className='cityandLocation roleanddelete' onClick={() => ChangeUserRole(user.role, user.userName, setUsers)}>
                                    {user.role}
                                </td>

                                <td className='cityandLocation roleanddelete'><DeleteIcon /></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewUsers;
