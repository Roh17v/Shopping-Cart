import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary">Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;