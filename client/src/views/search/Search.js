import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchLoggedUserDetails } from '../../redux/actions/loggedUserActions';
import { getItemsFromLocalStorage } from '../../utils/localStorageToken';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import UserQueryList from '../../components/userquerylist/UserQueryList';

import './search.scss';
import UserQueryError from '../../components/userqueryerror/UserQueryError';

// will be used to display search query to allows users to look for others
export default function Search(){
    const [query, setQuery] = useState('')
    const [queryData, setQueryData] = useState(null)
    const [queryError, setQueryError] = useState(null)

    const {userId: authenticatedUserId, token} = getItemsFromLocalStorage()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedUserDetails(authenticatedUserId))
    }, [dispatch, authenticatedUserId])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/user/search/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 'OK'){
                    setQueryData(result.data)
                    setQueryError(null)
                }
                if (result.status === 'FAILED'){
                    console.log(result.message)
                    setQueryError(result.message)
                    setQueryData(null)
                }
            })
            .catch(err => {
                console.log(err)
            })
        setQuery('')
    }

    return (
        <React.Fragment>
            <Header />
            <main className='search-page'>
                <h1 className='search-page--title'>Type in a username and we'll look it up</h1>
                <form 
                    onSubmit={handleSubmit}
                    className='search-page--form'
                >
                    <input
                        className='search-page--form__input' 
                        placeholder='Search user'
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value.trim().toLowerCase())}
                    />
                    <button className='search-page--form__btn'>
                        <i className="ri-search-2-line"></i>
                    </button>
                </form>
                <section className='search-page--result'>
                    {queryData && <UserQueryList userList={queryData} />}
                    {queryError && <UserQueryError message={queryError}/>}
                </section>

            </main>
            <Footer />
        </React.Fragment>
    )
}