import './Register.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { ReactComponent as Logo } from '../../../assets/images/logo-cimol.svg';

let registerEndpoint = process.env.REACT_APP_NODEJS_APP + process.env.REACT_APP_REGISTER_ENDPOINT;

const validationRegister = yup.object().shape({
    name: yup
        .string()
        .required("Nome é obrigatório"),
    cpf: yup
        .string()
        .required("O CPF é obrigatório"),
    email: yup
        .string()
        .email("Email inválido")
        .required("Email é obrigatório"),
    func: yup
        .string()
        .required("Função é obrigatória"),
    password: yup
        .string()
        .required("A senha é obrigatória")
});

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handleClickRegister = (values, { setSubmitting }) => {
        fetch(registerEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        setSuccessMessage('');
                        setErrorMessage('CPF ou email já existente');
                        throw new Error('CPF or email already exists');
                    } else {
                        setSuccessMessage('');
                        setErrorMessage('Erro inesperado! Contate o admnistador do sistema');
                        throw new Error('Network response was not ok');
                    }
                }
                setErrorMessage('');
                setSuccessMessage('Registro feito com sucesso!');
                return response.json();
            })
            .then(data => {
                console.log(data);
                setSubmitting(false);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                setSubmitting(false);
            });
    };

    return (
        <div className="Register">
            <div className="register-container">
                <Logo className="logo-cimol" />
                <Formik
                    initialValues={{ name: '', cpf: '', email: '', func: '', password: '' }}
                    onSubmit={handleClickRegister}
                    validationSchema={validationRegister}
                >
                    <Form className="login-form">
                        <div className="form-row">
                            <div className="login-form-group">
                                <Field name="name" className="form-field" placeholder="NOME" />
                            </div>

                            <div className="login-form-group">
                                <Field name="cpf" className="form-field" placeholder="CPF" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="login-form-group">
                                <Field name="email" className="form-field email" placeholder="EMAIL" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="login-form-group">
                                <Field name="func" className="form-field" placeholder="FUNÇÃO" />
                            </div>

                            <div className="login-form-group">
                                <Field type="password" name="password" className="form-field" placeholder="SENHA" />
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit">CADASTRO</button>
                        </div>
                        {errorMessage && <div className="form-error">{errorMessage}</div>}
                        {successMessage && <div className="form-success">{successMessage}</div>}
                        <ErrorMessage component="span" name="name" className="form-error" />
                        <ErrorMessage component="span" name="cpf" className="form-error" />
                        <ErrorMessage component="span" name="email" className="form-error" />
                        <ErrorMessage component="span" name="func" className="form-error" />
                        <ErrorMessage component="span" name="password" className="form-error" />
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Register;
