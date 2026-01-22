/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/store/hooks";
import { setCredentials } from "../../redux/store/store.authSlice";
import { useNavigate } from "react-router";
import { authApi } from "../../redux/features/auth/auth.api";

export default function Login() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await login({ email, password }).unwrap();

    // ✅ 1. Set auth state immediately
    dispatch(setCredentials({ user: res.user }));

    // ✅ 2. Invalidate getMe cache so future calls are correct
    dispatch(authApi.util.invalidateTags(["Me"]));

    // // ✅ 3. Redirect AFTER state is set
    // navigate("/dashboard");
  };
  

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <input name="email" className="input w-full" placeholder="Email" />
      <input
        name="password"
        type="password"
        className="input w-full mt-2"
        placeholder="Password"
      />
      <button className="btn w-full mt-4">Login</button>
    </form>
  );
}
