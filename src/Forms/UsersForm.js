import React from 'react';
import { reduxForm, Field } from 'redux-form';
import '../style.css';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.match('^[a-zA-Z ]*$') == null) {
    errors.name = 'Name fields contain only Alphabets';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Enter a valid Email';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.match('^[a-zA-Z ]*$') == null) {
    errors.lastName = 'Name fields contain only Alphabets';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.role) {
    errors.role = 'Required';
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning }
}) => {
  return (
    <div>
      <input
        className="FormInput"
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error },
  children
}) => (
  <div>
    <div>
      <select {...input}>{children}</select>
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
);

function UsersForm(props) {
  const { handleSubmit, pristine, reset, submitting, usersData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="main">
        <div className="compart">
          <div className="name">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" component={renderField} />
          </div>
        </div>

        <div className="compart">
          <label htmlFor="email">Email</label>

          <Field name="email" component={renderField} type="email" />
        </div>

        <div className="compart">
          <label htmlFor="password">Password</label>

          <Field name="password" component={renderField} type="text" />
        </div>

        <div className="compart">
          <label>Role</label>
          <Field name="role" component={renderSelectField} type="select">
            <option>Select Any</option>
            <option value="lawyer">Attorney</option>
            <option value="paralegal">Non-Attorney</option>
          </Field>
        </div>
        <div className="compart">
          <label htmlFor="isAdmin">Admin</label>

          <Field name="is_admin" component="input" type="checkbox" format={v => v === 1}  normalize={v => v ? 1 : 0} />
        </div>
      </div>
      <div className="button_area">
        <button
          className="FormButtons"
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
        <button
          className="FormButtons"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    usersData: state.ClientReducer && state.ClientReducer.usersData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

UsersForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm);

export default reduxForm({
  form: 'usersForm',
  validate
})(UsersForm);
