import {MDCTextField} from '@material/textfield';


export const usernameField = () => {
  return new MDCTextField(document.querySelector('.username'));
}

export const  passwordField = () => {
  return new MDCTextField(document.querySelector('.password'));
}

export const  organizationNameField = () => {
  return new MDCTextField(document.querySelector('.organizationName'));
}

export const  tagNameField = () => {
  return new MDCTextField(document.querySelector('.organizationName'));
}
