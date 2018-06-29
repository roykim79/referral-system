import {MDCTextField} from '@material/textfield/dist/mdc.textfield';


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

export const styleReactTagInput = () => {

  const tagInputField = document.querySelector('.ReactTags__tagInputField');
  tagInputField.classList.add("tagInputField")
  const newElement = document.createElement('label');
  const elementParent = tagInputField.parentNode;
  newElement.classList.add("mdc-floating-label")
  newElement.classList.add("mdc-floating-label--float-above")
  newElement.classList.add("mdc-floating-label")
  newElement.classList.add("react-tag-label")
  newElement.innerText = 'Add a new tag'

  elementParent.insertBefore(newElement, tagInputField.nextSibling);
}
