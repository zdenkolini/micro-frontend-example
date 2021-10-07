import React from "react";
import { Redirect } from "react-router";
import Routes from "../../constants/routes";
import TokenStore from "../../util/tokenStore";
import Navbar from "./components/navbar";

import styles from "./dashboard.module.scss";

interface DashboardProps extends React.PropsWithChildren<{}> {}

const Dashboard = ({ children }: DashboardProps): JSX.Element => {
  if (!TokenStore.isAuthenticated) {
    return <Redirect to={Routes.LOGIN} />;
  }

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Dashboard;
