import React, { useState, useEffect } from "react";

export default function App() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch("http://localhost:3001/")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data.username)
            })
            .catch(err => console.log(err))
    }, [])
    
    return <h1>Hello { user || 'Anonymous'}.</h1>;
}
