import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <div>
            <h1>404 - Page not Found</h1>
            <p>Sorry, but the page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

