import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import AddPostInput from "./components/addpostinput/AddPostInput";
import AddPostFile from "./components/addpostfile/AddPostFile";

import "./addpost.scss";

export default function AddPost() {
    const { userId: requestedUserId } = useParams();
    const { userId: authenticatedUserId } = getItemsFromLocalStorage();
	const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        imageUrl: null,
    });

	const [formError, setFormError] = useState({})
    const [preview, setPreview] = useState(null);

    // set form errors if any
    useEffect(() => {
        setFormError(updateCurrentFormError(formError, form))
    }, [form])

    // set preview picture
    useEffect(() => {
        if (form.imageUrl == null) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(form.imageUrl);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [form.imageUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { token, userId } = getItemsFromLocalStorage("photowall-user");
		if (!form.imageUrl){
			return;
		}

        let formData = new FormData();
        formData = addFieldsToFormData(form, formData);
        fetch(`/posts/${userId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
				if (result.status === 'OK'){
					return navigate(`/photowall/${authenticatedUserId}`)
				}
				if (result.errors) {
					// console.log(result.errors)
					// data.errors is an Array of error objects from the server
					// we set formError using a function that format this data.errors Array
					setFormError(formatErrorsToFormError(result.errors, form))
				}
			})
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        if (e.target.files) {
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    imageUrl: e.target.files[0],
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

    const handleFileClick = (e) => {
        e.preventDefault();
        document.querySelector("#select-file").click();
    };

    if (requestedUserId !== authenticatedUserId) {
        return <p>This is a private action</p>;
    }
    return (
        <React.Fragment>
            <Header />
            <main className="addpost-page">
                <div className="addpost--top">
                    <span
                        onClick={() => navigate(-1)}
                        className="addpost--top__back"
                    >
                        Cancel
                    </span>
                    <h1 className="addpost--top__title">
                        New post
                    </h1>
                    <button
                        className="addpost--top__btn"
                        onClick={handleSubmit}
                    >
                        Done
                    </button>
                </div>
                <form className="addpost-form" onSubmit={handleSubmit}>
					<AddPostFile
                        handleChange={handleChange}
                        handleFileClick={handleFileClick}
                        preview={preview}
                        hasPreview={preview ? true : false}
                    />
                    <AddPostInput
                        id={"addpost-title"}
                        type={"text"}
                        name={"title"}
                        placeholder={"Title"}
                        value={form.title}
                        handleChange={handleChange}
						errors={checkErrorInForm(formError, 'title')}
                    />
                    <AddPostInput
                        id={"addpost-description"}
                        type={"text"}
                        name={"description"}
                        placeholder={"Share why this moment was unique"}
                        value={form.description}
                        handleChange={handleChange}
						errors={checkErrorInForm(formError, 'description')}
                    />

                </form>
            </main>
            <Footer />
        </React.Fragment>
    );
}

function addFieldsToFormData(currentForm, finalForm) {
    // iterate over current form
    for (const [key, value] of Object.entries(currentForm)) {
        // if the key does not contain avatar
        if (!key.includes("image")) {
			finalForm.append(key, value);

        } else {
            // if the key contains image and has a value, we append it
            // but make sure we use the "postpicture" to be sync with multer
            if (value) finalForm.append("postpicture", value);
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
