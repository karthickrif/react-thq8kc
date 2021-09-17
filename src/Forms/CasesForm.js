import React from 'react';
import '../style.css';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

const validate = (values) => {
  const errors = {};
  if (!values.client_id) {
    errors.client_id = 'Required';
  }
  if (!values.case_title) {
    errors.case_title = 'Required';
  }
  if (!values.case_number) {
    errors.case_number = 'Required';
  }
  if (!values.county) {
    errors.county = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { asyncValidating, touched, error, warning },
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
  children,
}) => (
  <div>
    <div>
      <select {...input}>{children}</select>
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
);

function CasesForm(props) {
  const { handleSubmit, pristine, reset, submitting, casesData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_area">
        <div className="name">
          <div className="compart">
            <label htmlFor="clientID">Client ID</label>
            <Field name="client_id" type="input" component={renderSelectField}>
              <option>Select Any</option>
              {casesData != undefined && casesData.length > 0 ? (
                casesData.map((values) => (
                  <option value={values.client_id}>{values.client_name != undefined ? values.client_name : "Default"}</option>
                ))
              ) : (
                <option value="29f3a9f3-c568-4713-89c3-95b835b9f3dc">
                  Default
                </option>
              )}
            </Field>
          </div>
        </div>

        <div className="compart">
          <label htmlFor="case_title">Case Title</label>

          <Field name="case_title" component={renderField} type="text" />
        </div>

        <div className="compart">
          <label htmlFor="case_number">Case Number</label>

          <Field name="case_number" component={renderField} type="text" />
        </div>

        <div className="compart">
          <label>Claim Number</label>

          <Field
            name="claim_number"
            component={renderField}
            type="text"
          />
        </div>

        <div className="compart">
          <label htmlFor="matter_id">Matter ID</label>

          <Field name="matter_id" type="text" component={renderField} />
        </div>

        <div className="compart">
          <label htmlFor="clientDOB">Date of Loss</label>
          <Field name="date_of_loss" type="date" component={renderField} />
        </div>

        <div className="compart">
          <label htmlFor="county">County</label>
          <Field name="county" type="text" component={renderField} />
        </div>

        <div className="compart">
          <label htmlFor="state">State</label>
          <Field name="state" type="text" component={renderSelectField}>
            <option>Select Any</option>
            <option value="CA">California</option>
            <option value="TN">Tennesse</option>
            <option value="TX">Texas</option>
          </Field>
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

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    casesData: state.CasesReducer && state.CasesReducer.casesData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

CasesForm = connect(mapStateToProps, mapDispatchToProps)(CasesForm);

export default reduxForm({
  form: 'casesForm',
  validate,
})(CasesForm);
