import React from "react";

import "./searchform.scss";

export default function SearchForm({handleSubmit, query, setQuery}) {
    return (
        <form onSubmit={handleSubmit} className="search-page--form">
            <button className="search-page--form__btn">
                <i className="ri-search-2-line"></i>
            </button>
            <input
                className="search-page--form__input"
                placeholder="Search user"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value.trim().toLowerCase())}
            />
        </form>
    );
}
