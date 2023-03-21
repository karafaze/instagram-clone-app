import React from 'react';

import './formbutton.scss';

export default function FormButton({handleSubmit}){
    return <button onClick={handleSubmit} className="form--btn">Log In</button>
}