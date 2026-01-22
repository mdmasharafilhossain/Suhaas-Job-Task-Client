import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../redux/store/hooks";
import { setCredentials } from "../../redux/store/store.authSlice";


export default function Login() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();
    const res = await login({
      email: e.target.email.value,
      password: e.target.password.value,
    }).unwrap();

    dispatch(setCredentials({ user: res.user }));
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <input name="email" className="input w-full" placeholder="Email" />
      <input name="password" type="password" className="input w-full mt-2" placeholder="Password" />
      <button className="btn w-full mt-4">Login</button>
    </form>
  );
}
