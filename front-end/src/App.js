import './App.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";

function App() {


  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const handleClickUpdate = (values) => {
    Axios.put("http://localhost:3001/update", {
      email: values.email,
      password: values.password,
      newPassword: values.newPassword,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const handleClickDelete = (values) => {
    Axios.delete("http://localhost:3001/delete", {
      data: { email: values.email, password: values.password },
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
  });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  });

  const validationUpdate = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
    newPassword: yup.string().min(8, "A nova senha deve ter 8 caracteres").required("Este campo é obrigatório"),
  });

  const validationDelete = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
        <Form className="login-form">

        <div className="login-form-group">
          <Field name="email" className="form-field" placeholder="Email"/>
          <ErrorMessage component="span" name="email" className='form-error'/>
        </div>

        <div className="form-group">
          <Field name="password" className="form-field" placeholder="Senha"/>
          <ErrorMessage component="span" name="password" className="form-error"/>
        </div>
        <button className="button" type="submit">Login</button>

        </Form>
      </Formik>
      <h1>Cadastro</h1>
      <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
        <Form className="register-form">

        <div className="register-form-group">
          <Field name="email" className="form-field" placeholder="Email"/>
          <ErrorMessage component="span" name="email" className='form-error'/>
        </div>

        <div className="form-group">
          <Field name="password" className="form-field" placeholder="Senha"/>
          <ErrorMessage component="span" name="password" className="form-error"/>
        </div>

        <div className="form-group">
          <Field name="confirmPassword" className="form-field" placeholder="Confirme sua senha"/>
          <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
        </div>

        <button className="button" type="submit">Cadastrar</button>

        </Form>
      </Formik>
      <h1>Atualizar</h1>
      <Formik initialValues={{}} onSubmit={handleClickUpdate} validationSchema={validationUpdate}>
        <Form className="update-form">
          <div className="update-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Senha Atual" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="newPassword" className="form-field" placeholder="Nova Senha" />
            <ErrorMessage component="span" name="newPassword" className="form-error" />
          </div>
          <button className="button" type="submit">Atualizar</button>
        </Form>
      </Formik>
      <h1>Excluir</h1>
      <Formik initialValues={{}} onSubmit={handleClickDelete} validationSchema={validationDelete}>
        <Form className="delete-form">
          <div className="delete-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <button className="button" type="submit">Excluir</button>
        </Form>
      </Formik>
      
    </div>
  );
}

export default App;
