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

    const [preview, setPreview] = useState(null);

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
            .then((message) => console.log(message))
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
                <div className="edituserprofile--top">
                    <span
                        onClick={() => navigate(-1)}
                        className="edituserprofile--top__back"
                    >
                        Cancel
                    </span>
                    <h1 className="edituserprofile--top__title">
                        New post
                    </h1>
                    <button
                        className="edituserprofile--top__btn"
                        onClick={handleSubmit}
                    >
                        Done
                    </button>
                </div>
                <form className="addpost-form" onSubmit={handleSubmit}>
                    <AddPostInput
                        id={"addpost-title"}
                        type={"text"}
                        name={"title"}
                        placeholder={"Title"}
                        value={form.title}
                        handleChange={handleChange}
                    />
                    <AddPostInput
                        id={"addpost-description"}
                        type={"text"}
                        name={"description"}
                        placeholder={"Share why this moment was unique"}
                        value={form.description}
                        handleChange={handleChange}
                    />
                    <AddPostFile
                        handleChange={handleChange}
                        handleFileClick={handleFileClick}
                        preview={preview}
                        hasPreview={preview ? true : false}
                    />
                    <button>Send post</button>
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
            // we check it is not empty or unchanged from the current value
            if (value !== "") {
                // if it has changed, we append it to the form
                finalForm.append(key, value);
            }
        } else {
            // if the key contains avatar and has a value, we append it
            // but make sure we use the "avatar" to be sync with multer
            if (value) finalForm.append("postpicture", value);
        }
    }
    return finalForm;
}
