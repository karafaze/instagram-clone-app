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

	const [formError, setFormError] = useState({
		title: {
			hasError: false,
			message: 'You need to add a title',
			length: form.title.length,
		},
		description: {
			hasError: false,
			message: 'You description cannot exceed 250 characters',
			length: form.description.length,
		},
		imageUrl: {
			hasError: false,
			message: 'You need to add an image to your post'
		},
	})
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
			setFormError(prevForm => {
				return {
					...prevForm,
					imageUrl: {
						...prevForm.imageUrl,
						hasError: true,
					}
				}
			})
			return;
		} else if (form.title.length === 0){
			setFormError(prevForm => {
				return {
					...prevForm,
					title: {
						...prevForm.title,
						hasError: true,
					}
				}
			})
			return;
		} else if (form.description.length > 255){
			setFormError(prevForm => {
				return {
					...prevForm,
					description: {
						...prevForm.description,
						hasError: true,
					}
				}

			})
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
						errors={formError.imageUrl.hasError ? formError.imageUrl : null}
                    />
                    <AddPostInput
                        id={"addpost-title"}
                        type={"text"}
                        name={"title"}
                        placeholder={"Title"}
                        value={form.title}
                        handleChange={handleChange}
						errors={formError.title.hasError ? formError.title : null}
                    />
                    <AddPostInput
                        id={"addpost-description"}
                        type={"text"}
                        name={"description"}
                        placeholder={"Share why this moment was unique"}
                        value={form.description}
                        handleChange={handleChange}
						errors={formError.description.hasError ? formError.title : null}
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

function updateCurrentFormError(formError, formData){
    // we first create of copy of formError
    let formErrorCopy = {...formError}
	// iterate over the formError and check if there is still an error
	// else change the hasError status to false
	for (let [key, attr] of Object.entries(formError)){
		if (key === 'title' && attr.hasError && formData.title.length > 0){
			formErrorCopy.title = {
				...formErrorCopy.title,
				hasError: false,
			}
		}
		if (key === 'imageUrl' && attr.hasError && formData.imageUrl){
			formErrorCopy.imageUrl = {
				...formErrorCopy.imageUrl,
				hasError: false,
			}
		}
		if (key === 'description' && attr.hasError && formData.description.length < 255){
			formErrorCopy.description = {
				...formErrorCopy.description,
				hasError: false,
			}
		}
	}
    return formErrorCopy;
}
