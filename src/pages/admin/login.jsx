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
            window.location="/dashboard"
        })
        .catch(err => {
           // fake auth
        localStorage.setItem('access_token', "awawaw")
            window.location="/dashboard"
            console.error(err)
        })
    }
    const formik = useFormik({
        initialValues: {
            'email' : "",
            'password': "",
        },
        validationSchema: validationSchema,
        onSubmit: () => handleLogin()
    })    
    
    return (
        <div className="login-page">
            <form className="form-container" onSubmit={formik.handleSubmit} >
                <h1 className="title">Admin Login</h1>
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
                <Button className="btn-submit" type="submit" href='/'>Back</Button>
                <p className="signup"> Register as Admin ? <a href="./registeradmin">Register</a> </p>
            </form>
        </div>
    )
}