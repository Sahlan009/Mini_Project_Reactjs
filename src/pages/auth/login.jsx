import React from "react";
import {useFormik} from 'formik';
import * as yup from 'yup'
import { Button, FormFeedback, Input } from "reactstrap";
import axios from "axios";

import './style.scss'

const validationSchema = yup.object().shape({
    email: yup.string().email().required(""),
    password: yup.string().min(12).required("")
})

export default function Login () {
    
    const handleLogin = async () => {
        const data = formik.values
        await axios('http://localhost:8080/login', data)
        .then(res=> {
            localStorage.setItem('access_token', res.data.accessToken)
            window.location="/catalog"
        })
        .catch(err => {
           // fake auth
        localStorage.setItem('access_token', "awawaw")
            window.location="/catalog"
            console.error(err)
        })
    }

    const handleRegister = async () => {
        await axios('http://localhost:8080/register')
        .then(res=> {
            localStorage.setItem('access_token', res.data.accessToken)
            window.location="./resgiter"
        })
    }
    const formik = useFormik({
        initialValues: {
            'email' : "",
            'password': ""
        },
        validationSchema: validationSchema,
        onSubmit: () => handleLogin()
    })    
    
    return (
        <div className="login-page">
            <form className="form-container" onSubmit={formik.handleSubmit} >
                <h1 className="title">Login</h1>
                {
                    Object.keys(formik.initialValues).map((key, idx) => (
                        <div key={idx} className="row-input">
                            <Input
                            type={key === "password" ? "password" : "text"}
                            id={key}
                            name={key}
                            placeholder={key}
                            value={formik.values[key]}
                            onChange={formik.handleChange}
                            invalid={formik.touched[key] && Boolean(formik.errors[key])}
                            />
                        {
                            formik.touched[key] && Boolean(formik.errors[key]) &&
                            <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>
                        }
                        </div>
                    ))
                }
                <Button className="btn-submit" type="submit"> Login </Button>
                <p className="signup"> need an Account ? <a href="./register">Register</a> </p>
                <p className="signup"> login as admin <a href="./admin">Admin</a> </p>
            </form>
        </div>
    )
}