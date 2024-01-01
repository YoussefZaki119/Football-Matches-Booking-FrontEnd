import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "./main/Header";
import DeleteIcon from '@mui/icons-material/Delete';



function updateUser(username, setUsers) {

    const updatedUserManager = {
        status: 'approved',
    };

    let confirmationMessage = '';
    let updatedStatus = '';

  
        confirmationMessage = 'Do you want to approve this manager?';
        updatedStatus = 'approved';


    const result = window.confirm(confirmationMessage);

    if (result) {
        fetch(`http://localhost:3000/users/${username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserManager),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update manager status: ${response.statusText}`);
                }
                return response.json();
            })
            .then((updatedUser) => {
                // Update the local state to reflect the change
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.userName === username ? { ...user, status: updatedStatus } : user
                    )
                );
                console.log(`Manager status updated: ${JSON.stringify(updatedUser)}`);
            })
            .catch((error) => {
                console.error('Error updating manager status:', error);
            });
    }
}
function AuthUsers() {
    const [users, setUsers] = useState([]);

    async function logUsers() {
        const response = await fetch("http://localhost:3000/users/pending");
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
                            <th className='cityandLocation'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.userName}</td>
                                <td className='cityandLocation'>
                                    {user.role}
                                </td>
                                <td className='cityandLocation roleanddeleteicon'onClick={() => updateUser(user.userName,setUsers)}>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AuthUsers;
