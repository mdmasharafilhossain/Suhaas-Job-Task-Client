import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
} from "../../redux/features/admin/user.api";

export default function UserManagement() {
  const { data: users } = useGetUsersQuery();
  const [updateRole] = useUpdateUserRoleMutation();
  const [toggleStatus] = useToggleUserStatusMutation();

  return (
    <div className="p-6">
      <h2 className="font-bold mb-4">Users</h2>

      {users?.map(u => (
        <div key={u.id} className="border p-2 mb-2 flex justify-between">
          <div>
            <p>{u.email}</p>
            <p className="text-sm">{u.role} | {u.status}</p>
          </div>

          <div className="flex gap-2">
            <select
              value={u.role}
              onChange={e => updateRole({ id: u.id, role: e.target.value })}
            >
              <option>ADMIN</option>
              <option>MANAGER</option>
              <option>STAFF</option>
            </select>

            <button
              onClick={() =>
                toggleStatus({
                  id: u.id,
                  status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                })
              }
              className="btn"
            >
              Toggle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
