import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getItemsFromLocalStorage } from "../utils/localStorageToken";

export default function AuthGard({ children }) {
    const navigate = useNavigate();
    // fetching user is used many times
    // would need to be exported from utils

    useEffect(() => {
        const items = getItemsFromLocalStorage();
        if (!items.userId) {
            return navigate("/login");
        }

        const {userId, token} = items
        fetch(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "FAILED") {
                    return navigate("/login");
                }
                return;
            })
            .catch((err) => console.log(err));
    }, [navigate]);
    return children;
}
