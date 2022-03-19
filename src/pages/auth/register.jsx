import { React } from 'react'
import { Button, Container, FormFeedback, Input } from 'reactstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import './style.scss'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().min(6).required(),
  password: yup.string().min(12).required(),
  retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterAdmin = ({ setCurrentContainer }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      retypePassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister()
  });

  const handleRegister = async () => {
    const { email, username, password } = formik.values
    await axios.post(`http://localhost:8080/registeradmin`, {
      email,
      username,
      password
    })
      .then(() => {
        setCurrentContainer(false);
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="register-page">
    <Container>
      <form className="form-container" onSubmit={formik.handleSubmit}>
      <h1 className="title">Create Account</h1>
        {Object.keys(formik.initialValues).map((key, index) => (
            <div key={index} className="row-input">
              <Input
                type={key === "password" || key === "retypePassword" ? "password" : "text"}
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
        <Button onSubmit={formik.handleRegister} className="btn-submit" type="submit">
          Register
        </Button>
        <Button className="btn-submit" type="submit" href='/' >
          Back
        </Button>
      </form>
    </Container >
    </div>
  )
}

export default RegisterAdmin;