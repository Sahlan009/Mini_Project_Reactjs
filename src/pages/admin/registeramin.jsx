import { React } from 'react'
import { Button, Container, FormFeedback, Input } from 'reactstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().min(6).required(),
  password: yup.string().min(12).required(),
  retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  address: yup.string(),
  phone_number: yup.number().required(),
  join_date: yup.date()
});

const RegisterAdmin = ({ setCurrentContainer }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      retypePassword: '',
      address:'',
      phone_number:'',
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister()
  });

  const handleRegister = async () => {
    const { email, username, password,address ,phone_number, join_date } = formik.values
    await axios.post(`http://localhost:8080/registeradmin`, {
      email,
      username,
      password,
      address,
      phone_number,
      join_date
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
      <h1 className="title">Create Admin Account</h1>
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
        <Button className="btn-submit" type="submit" href='/admin' >
          Back
        </Button>
      </form>
    </Container >
    </div>
  )
}

export default RegisterAdmin;