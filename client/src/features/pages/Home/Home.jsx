import './Home.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../../assets/images/logo-cimol.svg';

let loginEndpoint = process.env.REACT_APP_NODEJS_APP + process.env.REACT_APP_LOGIN_ENDPOINT;

function Home() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    const handleClickLogin = (values) => {
        Axios.post(loginEndpoint, {
            cpf: values.cpf,
            password: values.password,
        }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/answer-key');
            } else {
                setErrorMsg('Credenciais incorretas');
            }
        }).catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        setErrorMsg('Credenciais incorretas');
                        break;
                    default:
                        setErrorMsg('Erro inesperado!');
                        break;
                }
            } else {
                setErrorMsg('Erro inesperado!');
            }
        });
    }

    const validationLogin = yup.object().shape({
        cpf: yup
            .string()
            .required("O CPF é obrigatório"),
        password: yup
            .string()
            .required("A senha é obrigatória")
    })

    return (
        <div className="Home">
            <div className="login-container">
                <Logo className="logo-cimol-home" />
                <h1>CAPSCsss</h1>
                <Formik
                    initialValues={{
                        cpf: '',
                        password: '',
                    }}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <Field name="cpf" className="form-field" placeholder="CPF" />
                        </div>

                        <div className="login-form-group">
                            <Field name="password" type="password" className="form-field" placeholder="SENHA" />
                        </div>

                        <div className="button-container">
                            <button type="submit">ENTRAR</button>
                        </div>

                        <div className="register-link">
                            <Link to="/register">CADASTRAR-SE</Link>
                        </div>

                        <div>
                            <ErrorMessage
                                component="span"
                                name="cpf"
                                className="form-error"
                            />
                            <ErrorMessage
                                component="span"
                                name="password"
                                className="form-error"
                            />
                        </div>
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Home;
