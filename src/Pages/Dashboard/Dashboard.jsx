import React, { useState } from 'react'
import { useAuthState } from '../../Context/auth-context'
import { useRequest } from '../../Requests/requests'
import { useParams } from 'react-router-dom'


export default function Dashboard() {
    const { user } = useAuthState()
    const [email, setEmail] = useState(null)
    const { get } = useRequest()
    const getUserData = async (e) => {
        get(`profile/${user}/`)
            .then(({data}) => setEmail( data.email ))
            .catch(error => console.log(error))
    }

    return (
        <div className="user-info-container">
            <div className="info">User ID: {user}</div>
            <button onClick={getUserData}>Get Information</button>
            {email && <div className="info">Email: {email}</div>}
        </div>
    )
}
