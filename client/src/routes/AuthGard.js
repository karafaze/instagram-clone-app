import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getItemsFromLocalStorage } from "../utils/localStorageToken";

export default function AuthGard({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const items = getItemsFromLocalStorage();
        if (!items.userId) return navigate("/login");
        const {userId, token} = items;
        try {
            fetch(`/user/protected/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === 'FAILED'){
                        return navigate('/login')
                    }
                })
                .catch(err => {
                    console.log(err.message)
                    return navigate('/login')
                })
        } catch(err){
            console.log(err)
            return navigate('/login')
        }

    }, [navigate])
    
    return children;
}
