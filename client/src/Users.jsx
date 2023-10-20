import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Users() {
    const [users, setUsers]=useState([])
    

    useEffect(() => {
        // Retrieve the JWT token from storage
        const token = localStorage.getItem('token');

        axios.get("http://localhost:3001/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setUsers(result.data);
            console.log(result);
        })
        .catch(err => {
            console.log(err);
            // Handle authentication errors, e.g., redirect to login
        });
    }, []);

    const handleDelete=(id)=>{
        const token = localStorage.getItem('token');
        axios.delete("http://localhost:3001/deleteUser/"+id,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        .then(res=>{
            console.log(res)
            setUsers(users.filter(user => user._id !== id));
        })
        .catch(err=>console.log(err))
        
    }
    return (

        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded р-3'>
                <Link to="/createUser" className='btn btn-success mx-2 my-2'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email </th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index)=>{
                                return ( 
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-success mx-2 my-2'>Update</Link>
                                        <button className='btn btn-danger mx-2 my-2' onClick={(e)=>handleDelete(user._id)}>Delete</button></td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Users
