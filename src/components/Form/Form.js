import React, { Component } from 'react';
import './Form.css';
import bondImg from './assets/bond_approve.jpg';

const Field = props => {
  const { label, name, error = '', value, onChange } = props;
  return (
    <p className="field">
      <label className="field__label" htmlFor={name}>
        <span className="field-label">{label}</span>
      </label>
      <input
        className={`field__input field-input t-input-${name}`}
        name={name}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      <span className={`field__error field-error t-error-${name}`}>
        {error}
      </span>
    </p>
  );
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: ParamsForm.defaultParamsForm(),
      errors: ParamsForm.defaultParamsForm(),
      isSubmited: false
    };
  }

  handleChangeInput = ({ target: { name, value } }) => {
    const { values } = this.state;
    this.setState({ values: { ...values, [name]: value } });
    this.clearErrors();
  };

  clearErrors = () => {
    this.setState({ errors: ParamsForm.defaultParamsForm() });
  };

  fillErrors = () => {
    let newErrors = ParamsForm.defaultParamsForm();
    const { values } = this.state;
    for (let key in values) {
      if (values[key] === '') {
        newErrors = { ...newErrors, [key]: getErrorsTextByName(key).error1 };
      } else {
        if (values[key].toLowerCase() !== getTemplateByName(key)) {
          newErrors = { ...newErrors, [key]: getErrorsTextByName(key).error2 };
        }
      }
    }
    return newErrors;
  };

  isValidate = () => {
    let errors = this.fillErrors();
    this.setState({errors});
    return (
      errors.firstname === '' &&
      errors.lastname === '' &&
      errors.password === ''
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isValidate()) {
      this.setState({ isSubmited: true });
    }
  };

  render() {
    const {
      values: { firstname, lastname, password },
      errors,
      isSubmited
    } = this.state;
    return (
      <div className="app-container">
        {isSubmited ? (
          <img src={bondImg} className="t-bond-image" alt="bond-approve" />
        ) : (
          <form className="form" onSubmit={this.handleSubmit}>
            <h1>Введите свои данные, агент</h1>
            <Field
              label="Имя"
              name="firstname"
              value={firstname}
              onChange={this.handleChangeInput}
              error={errors.firstname}
            />
            <Field
              label="Фамилия"
              name="lastname"
              value={lastname}
              onChange={this.handleChangeInput}
              error={errors.lastname}
            />
            <Field
              label="Пароль"
              className="t-input-firstname"
              name="password"
              value={password}
              onChange={this.handleChangeInput}
              error={errors.password}
            />
            <div className="form__buttons">
              <input
                type="submit"
                className="button t-submit"
                value="Проверить"
              />
            </div>
          </form>
        )}
      </div>
    );
  }
}

const getErrorsTextByName = name => {
  switch (name) {
    case 'firstname':
      return {
        error1: 'Нужно указать имя',
        error2: 'Имя указано не верно'
      };
    case 'lastname':
      return {
        error1: 'Нужно указать фамилию',
        error2: 'Фамилия указана не верно'
      };
    case 'password':
      return {
        error1: 'Нужно указать пароль',
        error2: 'Пароль указан не верно'
      };
    default:
      return {
        error1: '',
        error2: ''
      };
  }
};

const getTemplateByName = name => {
  switch (name) {
    case 'firstname':
      return 'james';
    case 'lastname':
      return 'bond';
    case 'password':
      return '007';
    default:
      return null;
  }
};

class ParamsForm {
    constructor(firstname, lastname, password){
        this.firstname = firstname
        this.lastname = lastname
        this.password = password
    }
    
    static defaultParamsForm() {
        return new ParamsForm('', '', '')
    }
    
}

export default Form;
