import React, { useState } from "react";
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import HeaderBack from "../../components/headerback/HeaderBack";
import Footer from "../../components/footer/Footer";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";

import SearchForm from "./components/searchform/SearchForm";
import UserQueryList from "./components/userquerylist/UserQueryList";
import UserQueryError from "./components/userqueryerror/UserQueryError";

import "./search.scss";

export default function Search() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [queryData, setQueryData] = useState(null);
    const [queryError, setQueryError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const { token } = getItemsFromLocalStorage();
        fetch(`/user/search/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setTimeout(() => {
                    if (result.status === "OK") {
                        setQueryData(result.data);
                        setQueryError(null);
                    }
                    if (result.status === "FAILED") {
                        console.log(result.message);
                        setQueryError(result.message);
                        setQueryData(null);
                    }
                    setIsLoading(false)
                }, 2000)

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
                    { isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <React.Fragment>
                            {queryData && <UserQueryList userList={queryData} />}
                            {queryError && <UserQueryError message={queryError} />}
                        </React.Fragment>
                    )}

                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
