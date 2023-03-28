import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGard({children}){
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('photowall-user'))
        if (!items){
            return navigate('/login')
        }
        fetch('/user', {
            headers: {
                Authorization: `Bearer ${items.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'FAILED'){
                    setIsLogged(false)
                    return navigate('/login')
                }
                setIsLogged(true)
            })
            .catch(err => console.log(err))

    }, [])
    return children;
}