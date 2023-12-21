import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "./main/Header";
import DeleteIcon from '@mui/icons-material/Delete';

function ChangeUserRole(role) {
    if (role === "Fan") {
        const result = window.confirm('Do you want to change User Role to Manager ?');
        if (result === 1)
        {

        }
    }

    if (role === "Manager") {
        const result = window.confirm('Do you want to change User Role to Fan ?');
    }
}

function ViewUsers() {
    const [users, setUsers] = useState([]);

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
                                <td className='cityandLocation roleanddelete' onClick={() => ChangeUserRole(user.role)}>
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
