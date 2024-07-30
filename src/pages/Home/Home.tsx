import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="d-flex items-center justify-content-center w-full py-5">
      <div className="text-center">
        <div className="mb-4 fs-2">Coming Soon...</div>
        <Button
          variant="primary"
          onClick={() => navigate("/store")}
        >
          Check out Store
        </Button>
      </div>
    </div>
  );
}

export default Home;
