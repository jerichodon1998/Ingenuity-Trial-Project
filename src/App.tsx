import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/errorPage";
import Recipe from "./routes/recipes";
import User from "./routes/users";
import Admin from "./routes/admin";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			errorElement: <ErrorPage />,
		},
		{
			path: "recipes/:id",
			element: <Recipe />,
		},
		{
			path: "users/:id",
			element: <User />,
		},
		{
			path: "admin/:id",
			element: <Admin />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
