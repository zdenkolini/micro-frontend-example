import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router";
import authService, { LoginError } from "../../api/auth";
import Routes from "../../constants/routes";
import TokenStore from "../../util/tokenStore";

import styles from "./login.module.scss";

interface Inputs {
  username: string;
  password: string;
}

interface LoginProps {}

const Login = ({}: LoginProps): JSX.Element => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { push } = useHistory();

  if (TokenStore.isAuthenticated) {
    return <Redirect to={Routes.DOCUMENTS} />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await authService.login(data);
      console.log(authService.login(data));
      TokenStore.authToken = response.data.access_token;
      push(Routes.DOCUMENTS);
    } catch (e) {
      const error = e as AxiosError<LoginError>;
      console.error(error);
      alert(error.response?.data.message || "Unhandled error");
    }
  };

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    const alertString = [];

    if (errors.username?.type === "required")
      alertString.push("Username is required");
    if (errors.password?.type === "required")
      alertString.push("Password is required");

    if (alertString.length) {
      alert(alertString.join("\n"));
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <input {...register("username", { required: true })} />
        <input {...register("password", { required: true })} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
