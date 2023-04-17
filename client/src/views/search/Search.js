import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchLoggedUserDetails } from "../../redux/actions/loggedUserActions";
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Footer from "../../components/footer/Footer";
import UserQueryList from "../../components/userquerylist/UserQueryList";
import UserQueryError from "../../components/userqueryerror/UserQueryError";

import "./search.scss";

export default function Search() {
    const [query, setQuery] = useState("");
    const [queryData, setQueryData] = useState(null);
    const [queryError, setQueryError] = useState(null);
    const navigate = useNavigate();

    const { userId: authenticatedUserId, token } = getItemsFromLocalStorage();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedUserDetails(authenticatedUserId));
    }, [dispatch, authenticatedUserId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/user/search/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === "OK") {
                    setQueryData(result.data);
                    setQueryError(null);
                }
                if (result.status === "FAILED") {
                    console.log(result.message);
                    setQueryError(result.message);
                    setQueryData(null);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setQuery("");
    };

    return (
        <React.Fragment>
            <main className="search-page">
                <section className="search-page--search">
                    <div 
                        onClick={() => navigate(-1)}
                        className="search-page--goback"
                    >
                        <i className="ri-arrow-left-s-line"></i>
                    </div>
                    <form onSubmit={handleSubmit} className="search-page--form">
                        <button className="search-page--form__btn">
                            <i className="ri-search-2-line"></i>
                        </button>
                        <input
                            className="search-page--form__input"
                            placeholder="Search user"
                            name="query"
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value.trim().toLowerCase())
                            }
                        />
                    </form>
                </section>

                <section className="search-page--result">
                    {queryData && <UserQueryList userList={queryData} />}
                    {queryError && <UserQueryError message={queryError} />}
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
