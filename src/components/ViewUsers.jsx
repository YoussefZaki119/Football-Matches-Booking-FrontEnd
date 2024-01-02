import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "./main/Header";
import DeleteIcon from '@mui/icons-material/Delete';

// function ChangeUserRole(role) {
//     if (role === "Fan") {
//         const result = window.confirm('Do you want to change User Role to Manager ?');
//         if (result === 1)
//         {

//         }
//     }

//     if (role === "Manager") {
//         const result = window.confirm('Do you want to change User Role to Fan ?');
//     }
// }
// async function deleteUser(deletedusername) {
       

//     const response = await fetch("http://localhost:3000/users/"+deletedusername, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (response.ok) {
//         alert('User deleted successfully');
//     } else {
//         alert('Failed to delete user');
//     }
// }


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
                                <td className='cityandLocation'>
                                    {user.role}
                                </td>
                                <td className='cityandLocation roleanddeleteicon'onClick={() => deleteUser(user.userName)}><DeleteIcon /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewUsers;