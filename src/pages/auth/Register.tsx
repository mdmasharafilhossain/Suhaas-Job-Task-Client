/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Invalid or missing invite token
      </div>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await axios.post(
        "http://localhost:5000/auth/register-via-invite",
        {
          token,
          name,
          password,
        },
        { withCredentials: true }
      );

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Complete Registration</h2>

        {error && (
          <p className="text-red-600 mb-2 text-sm">{error}</p>
        )}

        <input
          name="name"
          placeholder="Full Name"
          className="input w-full mb-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input w-full mb-3"
          required
        />

        <button
          disabled={loading}
          className="btn w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
