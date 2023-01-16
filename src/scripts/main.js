console.log("W0rking");

// Confirming Signin Password

var check = function () {
  if (
    document.getElementById("pass").value ==
    document.getElementById("re_pass").value
  ) {
    document.getElementById("signup").disabled = false;
    document.getElementById("signup").style.backgroundColor = "Green";
  } else {
    document.getElementById("signup").disabled = true;
    document.getElementById("signup").style.backgroundColor = "red";
  }
};
