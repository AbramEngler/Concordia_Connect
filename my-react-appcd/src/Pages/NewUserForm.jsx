//add to /src/Pages/NewUserForm.jsx
import React, { useState } from "react";
import axios from "axios";

const NewUserForm = () => {
    const [formData, setFormData] = useState({ //formData is created here
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/newuser",
                formData //send formData to API
            );
            console.log(response);
            alert("Form Submitted")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="type in name"
                    value={formData.name}
                    onChange={handleChange} //makes formData always up to date
                />
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="type in email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="type in password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </p>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewUserForm;