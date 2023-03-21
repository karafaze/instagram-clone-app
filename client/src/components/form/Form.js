import React from 'react';
import FormInput from "../forminput/FormInput";
import FormButton from "../formbutton/FormButton";
import FormSwitch from "../formswitch/FormSwitch";

import './form.scss';

export default function Form(){
    return (
        <section>
            <FormInput />
            <FormButton />
            <FormSwitch />
        </section>
    )
}