import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { appConfig, tenantConfig } from "../config/appConfig";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSuccess = async (response) => {
    setError("");
    setSubmitting(true);

    try {
      await login(response.credential);
      navigate("/loading", { replace: true });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const handleError = () => {
    setError("Google sign-in failed or was cancelled. Please try again.");
  };

  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="card shadow-sm w-100" style={{ maxWidth: "420px" }}>
        <div className="card-body p-4 text-center">
          <img
            src={tenantConfig.logoUrl}
            alt={`${tenantConfig.companyName} logo`}
            height="40"
            className="mb-2"
          />
          <h1 className="h5 mb-4">Sign in to {appConfig.name}</h1>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {submitting ? (
            <div className="py-2">
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              Checking your account...
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                text="signin_with"
                shape="rectangular"
                width="300"
              />
            </div>
          )}

          <div className="mt-4">
            <Link to="/" className="small text-muted">Back</Link>
          </div>
        </div>
      </div>
    </main>
  );
}