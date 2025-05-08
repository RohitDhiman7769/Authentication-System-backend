if (localStorage.getItem("auth_token") != null) {
  document.getElementById('userId').textContent = JSON.parse(localStorage.getItem("user")).id;
  document.getElementById('userName').textContent = JSON.parse(localStorage.getItem("user")).name;
  document.getElementById('userEmail').textContent = JSON.parse(localStorage.getItem("user")).email;
  document.getElementById('userCreatedAt').textContent = JSON.parse(localStorage.getItem("user")).created_at;
  showForm("profile");
}


// login btn funtion get login btn data
function LoginButton() {
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;
  const captchaResponse = grecaptcha.getResponse();

  if (!username && !password) {
    alert("Please fill all login fields.");
    return;
  }

  if (!username.trim()) {
    alert("Please enter registered username/Email.");
    return;
  }

  if (!password.trim()) {
    alert("Please enter your password.");
    return;
  }

  if (!captchaResponse) {
    alert("Please complete the CAPTCHA.");
    return;
  }

  // alert("Login successfully");
  const dataObj = {
    username: username,
    userPassword: password,
  };
  loginUser(dataObj);
}

// sign up btn funtion get sign up field data and passed to sign up register funtion
function SignupButton() {
  let signupName = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let signupPassword = document.getElementById("signupPassword").value;

  const isEmail = email.trim().includes("@");
  if (!signupName && !email && !signupPassword) {
    alert("Please fill all sign-up fields.");
    return;
  }
  if (!signupName.trim()) {
    alert("Please enter your username.");
    return;
  }
  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }
  if (!signupPassword.trim()) {
    alert("Please enter your password.");
    return;
  }
  if (email.length < 3) {
    alert("Username or email is too short.");
    return;
  }
  if (!isEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Invalid email format.");
    return;
  }

  const dataObj = {
    username: signupName,
    userEmail: email,
    userPassword: signupPassword,
  };
  registerUser(dataObj);
}

// user register funtion
async function registerUser(data) {
  try {
    const getSignUpResponse = await fetch(
      "http://localhost:3000/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await getSignUpResponse.json();
    if (result.status == 200) {
      alert(result.message);
      window.location.href = result.redirectTo; 
    } else {
      alert(result.message);
    }
  } catch (err) {
    alert("Server error. Please try again later.");
  }
}

//user login funtion
async function loginUser(data) {
  console.log(data)
  try {
    const getSignUpResponse = await fetch("http://localhost:3000/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await getSignUpResponse.json();
    if (result.success) {
      window.location.href = result.redirectTo; // manually redirect
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err)
  }
}

// logout button 
async function logOutBtn() {
  const getSignUpResponse = await fetch("http://localhost:3000/log-out", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await getSignUpResponse.json();
  if (result.success) {
    window.location.href = result.redirectTo; 
  } else {
    alert(result.message);
  }
}


