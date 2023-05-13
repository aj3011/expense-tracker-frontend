import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Grids from "./components/Grids";
import { CirclesWithBar } from "react-loader-spinner";
import PrivateRoute from "./Authentication/AuthComponents/privateRoute";
const ForgotPassword = React.lazy(() =>
  import("./Authentication/AuthComponents/forgotPassword")
);
const UpdateProfile = React.lazy(() =>
  import("./Authentication/AuthComponents/updateProfile")
);

const SignUpForm = React.lazy(() =>
  import("./Authentication/AuthComponents/signUpForm")
);
const LoginForm = React.lazy(() =>
  import("./Authentication/AuthComponents/loginForm")
);

const App = () => {
  return (
    <div>
      <Suspense
        fallback={
          <CirclesWithBar
            height="70vh"
            width="100vw"
            color="#42f5a1"
            wrapperStyle={{ marginTop: 100 }}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Grids />
              </PrivateRoute>
            }
          />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
