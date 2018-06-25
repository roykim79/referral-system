import {MDCTextField} from '@material/textfield';


export const usernameField = () => {
  return new MDCTextField(document.querySelector('.username'));
}

export const  passwordField = () => {
  return new MDCTextField(document.querySelector('.password'));
}
