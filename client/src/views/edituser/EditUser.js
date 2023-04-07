import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedUserDetails } from "../../redux/actions/loggedUserActions";
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

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

    const [formError, setFormError] = useState({})

    const navigate = useNavigate();
    // requestedUserId : the user we currently want to check the profile page
    const { userId: requestedUserId } = useParams();
    // authenticatedUserId : the user who is currently logged in
    const { userId: authenticatedUserId } = getItemsFromLocalStorage();

    const dispatch = useDispatch();

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
                    [name]: value,
                };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { token, userId } = getItemsFromLocalStorage("photowall-user");
        const formData = new FormData();

        if (form.username.trim() !== "" &&
            form.username.trim() !== userDetail.username   
        ) {
            formData.append("username", form.username);
        }
        if (form.bio.trim() !== "" &&
            form.bio.trim() !== userDetail.bio
        ) {
            formData.append("bio", form.bio);
        }
        if (form.avatarUrl) {
            formData.append("avatar", form.avatarUrl);
        }

        if (!(formData.has('username') ||
            formData.has('bio') ||
            formData.has('avatarUrl'))){
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
                            <div className="edituser-form--filewrapper">
                                <div className="selectfile-wrapper">
                                {
                                    userDetail ? (
                                        <img 
                                            className="selectfile-wrapper--current"
                                            src={userDetail.avatarUrl}
                                            alt="current-profile-avatar"
                                        />
                                    ) : (
                                        <div className="selectfile-wrapper--current"></div>
                                    )
                                }
                                {
                                    preview ? (
                                        <img 
                                            className="selectfile-wrapper--preview"
                                            src={preview}
                                            onClick={handleFileClick} 
                                            alt="preview-profile-avatar"
                                        />
                                    ) : (
                                        <div 
                                            className="selectfile-wrapper--preview"
                                            onClick={handleFileClick}    
                                        >
                                            <i className="ri-emotion-happy-line"></i>
                                        </div>
                                    )
                                }
                                </div>
                                <button 
                                    className="selectfile-wrapper--btn"
                                    onClick={handleFileClick}
                                >
                                    Change avatar
                                </button>
                                <input
                                    onChange={handleChange}
                                    id="select-file" 
                                    type="file"
                                    accept="image/*"
                                    name="avatar"
                                    style={{display: 'none'}}
                                />
                            </div>
                            <div className="edituser-form--group">
                                <label
                                    htmlFor="username"
                                    className="edituser-form--group__label"
                                >
                                    Username
                                </label>
                                <input 
                                    type="text"
                                    id="username"
                                    // className="edituser-form--group__input"
                                    className={`edituser-form--group__input ${formError.username && 'editform-input-error'}`}
                                    onChange={handleChange}
                                    name="username"
                                    value={form.username}
                                />
                            </div>
                            {formError.username && <span className="edituser-form--error">{formError.username.message}</span>}
                            <div className="edituser-form--group">
                                <label
                                    htmlFor="bio"
                                    className="edituser-form--group__label"
                                >
                                    Bio
                                </label>
                                <input 
                                    type="text"
                                    id="bio"
                                    className={`edituser-form--group__input ${formError.bio && 'editform-input-error'}`}
                                    onChange={handleChange}
                                    name="bio"
                                    value={form.bio}
                                
                                />
                            </div>
                            {formError.bio && <span className="edituser-form--error">{formError.bio.message}</span>}
                        </form>
                    </section>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
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