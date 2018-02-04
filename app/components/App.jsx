import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import ChangePassword from "./ChangePassword";
import ForgetPassword from "./ForgetPassword";
import NewPassword from "./NewPassword";
import ConfirmAction from "./ConfirmAction";
import ProceedConfirmation from "./ProceedConfirmation";

const FourOhFour = () => (
	<div>
		<h1>404</h1>
		<p>Not found</p>
	</div>
);

const App = () => (
	<div>
		<Switch>
			<Route exact path="/" component={Landing} />
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
			<Route path="/change-password" component={ChangePassword} />
			<Route path="/forget-password" component={ForgetPassword} />
			<Route
				path="/confirmation/new_password/:userId/:confirmationToken"
				component={NewPassword}
			/>
			<Route path="/action-confirmation" component={ConfirmAction} />
			<Route
				path="/confirmation/:confirmationToken"
				component={ProceedConfirmation}
			/>
			<Route component={FourOhFour} />
		</Switch>
	</div>
);

export default App;
