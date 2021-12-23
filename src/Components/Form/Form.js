import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as formActions from "./Duck/Form-Action";

/*
  Mandatory 
  - name
  - address
  - zipcode
  - phone

  validate  
  - phone - numberic - 10 digit
  - zipcode - numberic - 5 digit
  - email - valid email 
*/

const style = {
  inputBox: {
    padding: "3px",
    margin: "3px"
  },
  inputLabel: {
    width: "100px",
    display: "inline-block"
  }
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        mandatory: true,
        errorMsg: ""
      },
      address: {
        mandatory: false,
        errorMsg: ""
      },
      zipCode: {
        mandatory: false,
        errorMsg: ""
      },
      phone: {
        mandatory: false,
        errorMsg: ""
      },
      emailId: {
        mandatory: false,
        errorMsg: ""
      },
      password: {
        mandatory: false,
        errorMsg: ""
      },
      passwordConfirm: {
        mandatory: false,
        errorMsg: ""
      }
    };

    // this.preFillValues = this.preFillValues.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);

    this.validateForm = this.validateForm.bind(this);
    this.restrictInValidInput = this.restrictInValidInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm(data) {
    const returnValid = {
      valid: true,
      errorMessage: ""
    };
    let pass = "";
    switch (data.name) {
      case "phone":
        if (data.val.length < 10) {
          returnValid.valid = false;
          returnValid.errorMessage = "Invalid Phone Number";
        } else {
          returnValid.errorMessage = "";
        }
        break;
      case "zipCode":
        if (data.val.length < 5) {
          returnValid.valid = false;
          returnValid.errorMessage = "Invalid Zip Code";
        } else {
          returnValid.errorMessage = "";
        }
        break;
      case "emailId":
        const reg = /\S+@\S+\.\S+/;
        if (!reg.test(data.val) && data.val.length > 0) {
          returnValid.valid = false;
          returnValid.errorMessage = "Invalid e-Mail Id";
        } else {
          returnValid.errorMessage = "";
        }
        break;
      case "password":
        pass = data.val;
        break;
      case "passwordConfirm":
        if (pass == data.val) {
          returnValid.valid = false;
          returnValid.errorMessage = "Must be equals Password and confirm password.";
        } else {
          returnValid.errorMessage = "";
        }
        break;
    }

    return returnValid;
  }

  restrictInValidInput(event) {
    event.persist();
    const inputVal = event.target.value;
    const onlyNumbers = inputVal.replace(/[^0-9]/g, "");
    let allow = false;
    let pass = "";
    switch (event.target.name) {
      case "phone":
        if (inputVal.length <= 10 && inputVal === onlyNumbers) {
          allow = true;
        }
        break;
      case "zipCode":
        if (inputVal.length <= 5 && inputVal === onlyNumbers) {
          allow = true;
        }
        break;
      case "password":
        pass = inputVal;
        allow = true;
        break;
      case "passwordConfirm":
        if (pass == inputVal) {
          allow = true;
        }
        break;
      default:
        allow = true;
        break;
    }
    return allow;
  }

  validateMandatoryFields(key, data) {
    if (data[key].mandatory) {
      if (this.props.formInput[key].length === 0) {
        data[key].errorMsg = "This is an required field";
        return true;
      } else {
        const validateFieldInput = this.validateForm({
          name: key,
          val: this.props.formInput[key]
        });
        if (!validateFieldInput.valid) {
          data[key].errorMsg = validateFieldInput.errorMessage;
          return true;
        } else {
          data[key].errorMsg = "";
          return false;
        }
      }
    }
    // else {
    //   const validateFieldInput = this.validateForm({
    //     name: key,
    //     val: this.props.formInput[key]
    //   });
    //   if (!validateFieldInput.valid) {
    //     data[key].errorMsg = validateFieldInput.errorMessage;
    //     return true;
    //   } else {
    //     data[key].errorMsg = "";
    //     return false;
    //   }
    // }
  }

  handleSubmit() {
    let flagError = { ...this.state };
    const validateFields = Object.keys(this.state).map(key => {
      return this.validateMandatoryFields(key, flagError);
    });
    this.setState(flagError);
    // console.log(validateFields, validateFields.indexOf(true));
    if (validateFields.indexOf(true) >= 0) {
      console.log("validation failed");
    } else {
      console.log("validation success", this.props.formInput);

      // var formData = new FormData();
      // formData.append('form[name]', this.props.formInput.name);
      // formData.append('form[address]', this.props.formInput.address);
      // formData.append('form[zipcode]', this.props.formInput.zipCode);
      // formData.append('form[phone]', this.props.formInput.phone);
      // formData.append('form[email]', this.props.formInput.emailId);
      // formData.append('form[password]', this.props.formInput.password);
      // formData.append('form[passwordConfirm]', this.props.formInput.passwordConfirm);

      
    }
  }

  handleOnBlur(event) {
    const inputVal = {
      val: event.target.value,
      name: event.target.name
    };
    const validated = this.validateForm(inputVal);
    if (!validated.valid) {
    let flagError = { ...this.state };
    flagError[inputVal.name].errorMsg = validated.errorMessage;
    console.log("incorrect", validated.errorMessage, flagError);
    this.setState(flagError);
    }
  }

  handleChange(event) {
    const allowUpdate = this.restrictInValidInput(event);
    if (allowUpdate) {
      this.props.formActions.updateFormFields(event);
    }
  }

  // preFillValues() {
  //   this.props.formActions.prefillFormFields({
  //     name: "Edison",
  //     address: "1 LA 0009 US",
  //     zipCode: "0009",
  //     phone: "98989898989",
  //     emailId: "edison@wipro.com"
  //   });
  // }

  render() {
    return (
      <div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            Name{" "}
          </label>
          <input
            type="text"
            value={this.props.formInput.name}
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
            name="name"
          />
          <span>{this.state.name.errorMsg}</span>
        </div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            Address{" "}
          </label>
          <input
            type="text"
            value={this.props.formInput.address}
            name="address"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
          <span>{this.state.address.errorMsg}</span>
        </div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            Zip Code{" "}
          </label>
          <input
            type="text"
            value={this.props.formInput.zipCode}
            name="zipCode"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
          <span>{this.state.zipCode.errorMsg}</span>
        </div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            Phone{" "}
          </label>
          <input
            type="text"
            value={this.props.formInput.phone}
            name="phone"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
          <span>{this.state.phone.errorMsg}</span>
        </div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            Email Id{" "}
          </label>
          <input
            type="text"
            value={this.props.formInput.emailId}
            name="emailId"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
          <span>{this.state.emailId.errorMsg}</span>
        </div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            Password{" "}
          </label>
          <input
            type="password"
            value={this.props.formInput.password}
            name="password"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
          <span>{this.state.password.errorMsg}</span>
        </div>
        <div style={style.inputBox}>
          <label style={style.inputLabel} htmlFor="name">
            password Confirm{" "}
          </label>
          <input
            type="password"
            value={this.props.formInput.passwordConfirm}
            name="passwordConfirm"
            onChange={this.handleChange}
            onBlur={this.handleOnBlur}
          />
          <span>{this.state.passwordConfirm.errorMsg}</span>
        </div>
        
        <div style={style.inputBox}>
          <input type="button" value="Submit" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formInput: state.formFields
});

const mapDispatchToProps = dispatch => ({
  formActions: bindActionCreators(formActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

//export default Form;
