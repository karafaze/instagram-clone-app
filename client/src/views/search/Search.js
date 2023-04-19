import React, { useState } from "react";
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import HeaderBack from "../../components/headerback/HeaderBack";
import Footer from "../../components/footer/Footer";

import SearchForm from "./components/searchform/SearchForm";
import UserQueryList from "./components/userquerylist/UserQueryList";
import UserQueryError from "./components/userqueryerror/UserQueryError";

import "./search.scss";

export default function Search() {
    const [query, setQuery] = useState("");
    const [queryData, setQueryData] = useState(null);
    const [queryError, setQueryError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { token } = getItemsFromLocalStorage();
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
                <HeaderBack>
                    <SearchForm 
                        handleSubmit={handleSubmit}
                        query={query}
                        setQuery={setQuery}
                    />
                </HeaderBack>
                <section className="search-page--result">
                    {queryData && <UserQueryList userList={queryData} />}
                    {queryError && <UserQueryError message={queryError} />}
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
