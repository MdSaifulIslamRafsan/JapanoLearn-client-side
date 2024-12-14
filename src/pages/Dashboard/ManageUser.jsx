import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const ManageUser = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch users data
  const { data: usersData, refetch  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosPublic.get("/api/auth/user", { withCredentials: true }).then((res) => {
        return res.data;
      }),
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosPublic.patch(
        `/api/auth/user/${userId}`, 
        { role: newRole },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: response?.data?.message,
          icon: "success",
          timer: 3000,
        });
        refetch(); 
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:  error?.response?.data?.message || error?.message,
        icon: "error",
        timer: 3000,
      });
    }
  };
  const columns = [
    {
      name: "User name",
      selector: (user) => user.name,
     
    },
    {
      name: "User email",
      selector: (user) => user.email,
    },
    {
      name: "Role",
      cell: (user) => (
        <select
          className="form-select bg-blue-500 px-4 py-2 text-white"
          value={user.role}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
  ];

  
 

  return (
    <>
      <DataTable columns={columns} data={usersData?.data} pagination />
    </>
  );
};

export default ManageUser;
