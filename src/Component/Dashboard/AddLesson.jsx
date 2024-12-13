import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddLesson = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newLesson = {
        lessonName: data.lessonName,
      };

      const response = await axiosPublic.post("/api/lesson", newLesson , {withCredentials: true});
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.data?.message,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || error?.message,
        timer: 3000,
      });
    }
  };

  return (
    <div className="container max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Lesson</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="lessonName"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson Name
          </label>
          <input
            type="text"
            id="lessonName"
            {...register("lessonName", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Lesson Name"
          />
          {errors.lessonName && (
            <p className="text-red-500 text-sm">Lesson Name is required</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
