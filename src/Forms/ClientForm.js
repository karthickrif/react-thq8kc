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

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Enter a valid Email';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (values.phone.match('^[0-9]*$') == null) {
    errors.phone = 'Enter valid Contact number';
  } else if (values.phone.length > 10) {
    errors.phone = 'Enter valid Contact number';
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
        ((error && <div className="error">{error}</div>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

const renderPhone = ({
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
        maxLength="10"
      />
      {touched &&
        ((error && <div className="error">{error}</div>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

function ClientForm(props) {
  const { handleSubmit, pristine, reset, submitting, clientData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_area">
        <div className="name">
          <div className="clientName">
            <label htmlFor="clientName">Client Name</label>
            <Field
              name="name"
              type="text"
              placeholder="Stephen"
              component={renderField}
            />
          </div>
        </div>

        <div className="compart">
          <label htmlFor="clientEmail">Email</label>

          <Field
            name="email"
            component={renderField}
            type="email"
            placeholder="stephen@gmail.com"
          />
        </div>

        <div className="compart">
          <label htmlFor="clientPhone">Phone</label>

          <Field
            name="phone"
            component={renderPhone}
            type="text"
            placeholder="9999-999-999"
            maxLength="10"
          />
        </div>

        <div className="compart">
          <label>Address</label>

          <Field
            name="address"
            component={renderField}
            type="text"
            placeholder="Downtown lane,CA"
          />
        </div>

        <div className="compart">
          <label htmlFor="dob">D.O.B</label>
          <div>
            <Field name="dob" type="date" component="input" dateForm="MM/DD/YYYY"/>
          </div>
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
    clientData: state.ClientReducer && state.ClientReducer.clientData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

ClientForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientForm);

export default reduxForm({
  form: 'clientForm',
  validate,
  // asyncValidate,
  asyncBlurFields: ['firstName']
})(ClientForm);
