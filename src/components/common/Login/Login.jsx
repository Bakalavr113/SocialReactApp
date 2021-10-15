import React from "react";
import { Field, reduxForm } from "redux-form";
import {LoginUser} from "../../../redux/auth-reducer"
import { connect } from "react-redux";
const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 15) {
    errors.password = "Must be 15 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  // if (!values.age) {
  //   errors.age = "Required";
  // } else if (isNaN(Number(values.age))) {
  //   errors.age = "Must be a number";
  // } else if (Number(values.age) < 18) {
  //   errors.age = "Sorry, you must be at least 18 years old";
  // }
  return errors;
};

// const warn = (values) => {
//   const warnings = {};
//   if (values.age < 19) {
//     warnings.age = "Hmm, you seem a bit young...";
//   }
//   return warnings;
// };

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const  Login = (props) => {
 const  onSubmit  = (values) => {
    props.LoginUser(values.email, values.password, values.rememberMe )
    // print the form values to the console
    
  };
    return (
      <>
        <ContactForm onSubmit={onSubmit} props={props} />
      </>
    );
  }


let ContactForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error } = props;
  return (
    <>
      <form onSubmit={handleSubmit}>
      
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
  <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          name="rememberMe"
          type="checkbox"
          component={renderField}
          label="Remember Me"
        />
        {error && <div>{error}</div>}
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    </>
  );
};
ContactForm = reduxForm({
  // a unique name for the form
  form: "login",
  validate, // <--- validation function given to redux-form
  // warn, //
})(ContactForm);

export default  connect(null, {LoginUser})(Login);
