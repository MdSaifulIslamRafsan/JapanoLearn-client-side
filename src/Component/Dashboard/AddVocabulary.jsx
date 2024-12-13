import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddVocabulary = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const newVocabulary = {
        word: data.word,
        pronunciation: data.pronunciation,
        whenToSay: data.whenToSay,
        lessonNo: parseInt(data.lessonNo), 
        adminEmail: data.adminEmail,
      };

      const response = await axiosPublic.post("/api/vocabulary", newVocabulary, {
        withCredentials: true,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.data?.message,
          timer: 3000,
        });
        reset(); 
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
      <h2 className="text-2xl font-bold text-center mb-4">Add New Vocabulary</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700"
          >
            Word (Japanese)
          </label>
          <input
            type="text"
            id="word"
            {...register("word", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Word"
          />
          {errors.word && (
            <p className="text-red-500 text-sm">Word is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="pronunciation"
            className="block text-sm font-medium text-gray-700"
          >
            Pronunciation
          </label>
          <input
            type="text"
            id="pronunciation"
            {...register("pronunciation", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Pronunciation"
          />
          {errors.pronunciation && (
            <p className="text-red-500 text-sm">Pronunciation is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="whenToSay"
            className="block text-sm font-medium text-gray-700"
          >
            When to Say
          </label>
          <textarea
            id="whenToSay"
            {...register("whenToSay", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Describe when to use the word"
          />
          {errors.whenToSay && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lessonNo"
            className="block text-sm font-medium text-gray-700"
          >
            Lesson No
          </label>
          <input
            type="number"
            id="lessonNo"
            {...register("lessonNo", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Lesson Number"
          />
          {errors.lessonNo && (
            <p className="text-red-500 text-sm">Lesson No is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="adminEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Admin Email
          </label>
          <input
            type="email"
            id="adminEmail"
            {...register("adminEmail", { required: true })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Admin Email"
          />
          {errors.adminEmail && (
            <p className="text-red-500 text-sm">Admin Email is required</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Vocabulary
        </button>
      </form>
    </div>
  );
};

export default AddVocabulary;
