


// This function validates the given password based on multiple conditions:
// 1. At least 1 uppercase letter
// 2. At least 1 lowercase letter
// 3. At least 1 number
// 4. At least 1 special character from [@$!%*?&]
// 5. The password must be between 8 and 16 characters long.
// If any condition fails, the corresponding error message is set using the setPassError function.

export const passwordValidation = (password, setPassError) => {

  
  //length
  if (!/[A-Z]/.test(password)) {
    //upper
    setPassError("At least 1 uppercase char!!");
  } else if (!/[a-z]/.test(password)) {
    //lower
    setPassError("At least 1 lowercase char!!");
  } else if (!/[0-9]/.test(password)) {
    //number
    setPassError("At least 1 number!!");
  } else if (!/[@$!%*?&]/.test(password)) {
    //special character
    setPassError("At least 1 special char [@$!%*?&]");
  } else if (password.length < 8) {
    setPassError("At least 8 characters!");
  } else if (password.length > 16) {
    setPassError("Maximum 16 characters!");
  } else {
    setPassError("");
  }
};
