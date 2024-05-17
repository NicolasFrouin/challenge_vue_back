exports.PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\s\w])[^\s]{12,63}$/;

exports.EMAIL_REGEX = /^[-+\w.]+@([\w-]+\.)+[\w-]{1,16}$/;

exports.ROLES = {
  user: "ROLE_USER",
  accountant: "ROLE_ACCOUNTANT",
  admin: "ROLE_ADMIN",
};
