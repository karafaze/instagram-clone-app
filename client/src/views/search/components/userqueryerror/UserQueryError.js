import React from 'react';

import './userqueryerror.scss';

export default function UserQueryError({message}){
    return <p className='search-page--query-error'>{message}</p>
}