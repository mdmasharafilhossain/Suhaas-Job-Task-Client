/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useInviteUserMutation } from "../../redux/features/admin/user.api";

export default function InviteUser() {
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setInviteLink("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

    try {
      const res = await inviteUser({ email, role }).unwrap();
      setSuccess("Invite sent successfully!");
      if (res.link) setInviteLink(res.link);
      form.reset();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to send invite");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Invite User</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="User email"
          className="input w-full"
          required
        />

        <select name="role" className="input w-full" required>
          <option value="">Select role</option>
          <option value="STAFF">STAFF</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="btn w-full"
        >
          {isLoading ? "Sending..." : "Send Invite"}
        </button>
      </form>

      {/* Success */}
      {success && (
        <p className="mt-4 text-green-600 font-medium">{success}</p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}

      {/* Optional invite link preview */}
      {inviteLink && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-semibold mb-1">
            Invite Link (email already sent)
          </p>
          <a
            href={inviteLink}
            target="_blank"
            className="text-blue-600 text-sm break-all"
          >
            {inviteLink}
          </a>
        </div>
      )}
    </div>
  );
}
