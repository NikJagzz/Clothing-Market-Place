import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { userName, userEmail, isLoggedIn, refetch } = useAuth();

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Not authenticated");
      navigate("/login");
      return;
    }

    const userId = session.user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ name })
      .eq("id", userId);

    if (profileError) {
      setError("Failed to update profile name: " + profileError.message);
      return;
    }

    if (password.trim() !== "") {
      const { error: passwordError } = await supabase.auth.updateUser({
        password,
      });

      if (passwordError) {
        setError("Failed to update password: " + passwordError.message);
        return;
      }
    }

    await refetch();

    setMessage("Account updated successfully!");
    setPassword("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <form onSubmit={handleUpdate} className="space-y-4" autoComplete="off">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="w-full border p-2 rounded bg-gray-100"
            value={userEmail ?? ""}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">New Password</label>
          <input
            type="password"
            name="new-password"
            autoComplete="new-password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Account
        </button>
      </form>
    </div>
  );
}
