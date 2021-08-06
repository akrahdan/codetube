export type SSOEmailFieldProps = {
  showPasswordField:string,
  setShowPasswordField:string,
  emailFieldValue:string,
  setEmailFieldValue: string,
  onUpdate:string,
  emailLabel:string,
  name:string,
}

export type SSOPasswordFieldProps = {
  showPasswordField: boolean
  name:string,
  isRegistration:boolean,
}