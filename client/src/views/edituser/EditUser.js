import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedUserDetails } from "../../redux/actions/loggedUserActions";
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import EditFormFile from "./components/editformfile/EditFormFile";
import EditFormInput from './components/editforminput/EditFormInput'

import "./edituser.scss";

export default function EditUser() {
    // data from redux state about logged user
    const userDetail = useSelector((state) => state.loggedUser.userData);
    // preview state in case user is changing photos
    const [preview, setPreview] = useState(null)
    // form data 
    const [form, setForm] = useState({
        username: "",
        bio: "",
        avatarUrl: null,
    });
    // form error if errors
    const [formError, setFormError] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // requestedUserId : the user we currently want to check the profile page
    const { userId: requestedUserId } = useParams();
    // authenticatedUserId : the user who is currently logged in
    const { userId: authenticatedUserId } = getItemsFromLocalStorage();

    // fill logged user data
    useEffect(() => {
        dispatch(fetchLoggedUserDetails(authenticatedUserId));
    }, [dispatch, authenticatedUserId, requestedUserId]);

    // initialize form values with current user data
    useEffect(() => {
        const { token, userId } = getItemsFromLocalStorage("photowall-user");
        fetch(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setForm((prevForm) => {
                    return {
                        ...prevForm,
                        username: result.data.username,
                        bio: result.data.bio,
                    };
                });
            })
            .catch((err) => console.log(err));
    }, []);

    // set preview picture
    useEffect(() => {
        if (form.avatarUrl == null) {
            setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(form.avatarUrl)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [form.avatarUrl])

    useEffect(() => {
        setFormError(updateCurrentFormError(formError, form))
    }, [form])

    // make sure only owner can edit profile
    if (requestedUserId !== authenticatedUserId) {
        return <p>This is a private action.</p>;
    }

    // handle form field changes
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files) {
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    avatarUrl: e.target.files[0],
                };
            });
        } else {
            const { name, value } = e.target;
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    [name]: value.trim(),
                };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { token, userId } = getItemsFromLocalStorage("photowall-user");
        let formData = new FormData();
        formData = addFieldsToFormData(form, userDetail, formData)

        if ((!formData.has('username') &&
            !formData.has('bio') &&
            !formData.has('avatar'))){
            // the user has clicked without changing any fields
            // so we send him back to his previous page
            return navigate(-1)
        } else {
            fetch(`/user/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.status === 'OK'){
                        // update was successfull, so we send the user
                        // back to the previous page
                        return navigate(-1)
                    }
                    if (result.errors){
                        // data.errors is an Array of error objects from the server
                        // we set formError using a function that format this data.errors Array
                        setFormError(formatErrorsToFormError(result.errors, form))
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    // will fire click event on input type file
    const handleFileClick = (e) => {
        e.preventDefault();
        document.querySelector('#select-file').click()
    }

    if (!userDetail) {
        <p>Loading data</p>;
    } else {
        return (
            <React.Fragment>
                <Header />
                <main className="edituserprofile">
                    <div className="edituserprofile--top">
                        <span
                            onClick={() => navigate(-1)} 
                            className="edituserprofile--top__back"
                            >
                                Cancel
                        </span>
                        <h1 className="edituserprofile--top__title">Edit profile</h1>
                        <button 
                            className="edituserprofile--top__btn"
                            onClick={handleSubmit}
                        >
                            Done
                        </button>
                    </div>
                    <section className="edituserprofile--main">
                        <form className="edituser-form">
                            <EditFormFile 
                                isLoading={!userDetail ? true : false}
                                avatarUrl={userDetail ? userDetail.avatarUrl : ''}
                                hasPreview={preview ? true : false}
                                preview={preview}
                                handleFileClick={handleFileClick}
                                handleChange={handleChange}
                            />
                            <EditFormInput
                                id={"username"}
                                type= {"text"}
                                name={"username"}
                                placeholder={"Username"}
                                value={form.username}
                                handleChange={handleChange}
                                errors={checkErrorInForm(formError, 'username')}
                            />
                            <EditFormInput
                                id={"bio"}
                                type= {"text"}
                                name={"bio"}
                                placeholder={"Tell your friends something about you"}
                                value={form.bio}
                                handleChange={handleChange}
                                errors={checkErrorInForm(formError, 'bio')}
                            />
                        </form>
                    </section>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
}

function addFieldsToFormData(currentForm, userDetail, finalForm){
    // iterate over current form
    for (const [key, value] of Object.entries(currentForm)){
        // if the key does not contain avatar
        if (!key.includes('avatar')){
            // we check it is not empty or unchanged from the current value
            if (value !== "" &&
            value !== userDetail[key]){
                // if it has changed, we append it to the form
                finalForm.append(key, value)
            }
        } else {
            // if the key contains avatar and has a value, we append it
            // but make sure we use the "avatar" to be sync with multer
            if (value) finalForm.append('avatar', value); 
        }

    }
    return finalForm;
}

function formatErrorsToFormError(errorsArray, currentFormData){
    // we initialize an empty objects that will contain
    // our new formError
    // its shape will be an object with nested object within : 
    // { 
        // errorInputName1: {message: errorMessage, length: length of the input in formData},
        // errorInputName2: {...},
    //  }
    let formError = {};
    // we first iterate over the array of errors
    for (let errorObject of errorsArray){
        // retrieve the input name that contain the error
        const inputErrorName = errorObject.param
        // and create a new formatted error object 
        const updatedFormError = {
            message: errorObject.msg,
            length: currentFormData[inputErrorName].length
        }
        // and we add this new error to our formError object
        formError[inputErrorName] = updatedFormError
    }
    // after iteration, we have a fully new formError object that we return
    return formError;
}

function updateCurrentFormError(formError, formData){
    // we first create of copy of formError 
    let formErrorCopy = {...formError}
    // we first get a list of the keys in formError
    let keyList = Object.keys(formErrorCopy)
    if (keyList.length > 0){
        // if it contains at least one error
        // we update the key list to keep only the inputs that didn't change
        // by comparing their length
        // if the length has changed, it means the user has typed something else
        keyList = keyList.filter(key => formData[key].length === formError[key].length)

        // now that the list has been updated 
        // we iterate over the key of formErrorCopy
        for (let key of Object.keys(formErrorCopy)){
            // for each key
            // if the key is not in the keyList from above
            if (!keyList.includes(key)){
                // we delete that key and its value from the errorFormCopy
                delete formErrorCopy[key]
            }
        }
        // now we have an object that contains only errors that 
        // haven't been modified since the user sent the form 
        // and received intel from the server
        return formErrorCopy;
    }
    return formError;
}

function checkErrorInForm(formError, field){
    // function to be used to send error message to FormInput.js
    // we simply want to return either the errorMessage
    // or null
    return formError[field] || null
}