import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DataTable from "react-data-table-component";

const VocabularyManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentvocabulary, setCurrentvocabulary] = useState(null);

  const {
    data: vocabularyData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["vocabularys"],
    queryFn: () =>
      axiosPublic
        .get("/api/vocabulary", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });


  const handleEditClick = (vocabulary) => {
    setCurrentvocabulary(vocabulary);
    setIsModalOpen(true);
  };

  console.log(currentvocabulary)

  const handleSave = () => {
    
    currentvocabulary.lessonNo = parseInt(currentvocabulary.lessonNo)
    axiosPublic
      .put(
        `/api/vocabulary/${currentvocabulary._id}`,
        { currentvocabulary },
        { withCredentials: true }
      )
      .then((res) => {
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: res?.data?.message,
          confirmButtonColor: "#3085d6",
        });
        refetch();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error?.response?.data?.message || error?.message,
          confirmButtonColor: "#d33",
        });
        console.error("Error updating vocabulary:", error);
      });
  };

  const handleDelete = (vocabularyNumber) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/api/vocabulary/${vocabularyNumber}`, {
            withCredentials: true,
          })
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Your vocabulary has been deleted.",
              "success"
            );
            refetch();
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const columns = [
    {
      name: "Word",
      selector: (vocabulary) => vocabulary.word,
    },
    {
      name: "Meaning",
      selector: (vocabulary) => vocabulary.meaning.substring(0 ,10) + ".....",
    },
    {
      name: "Pronunciation",
      selector: (vocabulary) => vocabulary.pronunciation,
    },
    {
      name: "When to Say",
      selector: (vocabulary) => vocabulary.whenToSay.substring(0 ,10) + ".....",
    },
    {
      name: "Lesson No",
      selector: (vocabulary) => vocabulary.lessonNo,
    },
    {
      name: "Edit",
      cell: (vocabulary) => (
        <button
          className="btn btn-primary hover:btn-primary text-white"
          onClick={() => handleEditClick(vocabulary)}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (vocabulary) => (
        <button
          onClick={() => handleDelete(vocabulary._id)}
          className="btn btn-primary hover:btn-primary text-white"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={vocabularyData?.data} pagination />
      {isModalOpen && (
        <div className="fixed lg:left-60 overflow-auto inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white   p-5 rounded shadow-md w-1/2">
            <h2 className="text-lg mt-10 font-bold mb-4">Edit Vocabulary</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="editWord"
                  className="block text-sm font-medium text-gray-700"
                >
                  Word (Japanese)
                </label>
                <input
                  type="text"
                  id="editWord"
                  value={currentvocabulary?.word || ""}
                  onChange={(e) =>
                    setCurrentvocabulary({
                      ...currentvocabulary,
                      word: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter Word"
                />
              </div>

              <div>
                <label
                  htmlFor="editPronunciation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pronunciation
                </label>
                <input
                  type="text"
                  id="editPronunciation"
                  value={currentvocabulary?.pronunciation || ""}
                  onChange={(e) =>
                    setCurrentvocabulary({
                      ...currentvocabulary,
                      pronunciation: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter Pronunciation"
                />
              </div>

              <div>
                <label
                  htmlFor="editMeaning"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meaning
                </label>
                <textarea
                  id="editMeaning"
                  value={currentvocabulary?.meaning || ""}
                  onChange={(e) =>
                    setCurrentvocabulary({
                      ...currentvocabulary,
                      meaning: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter the meaning of the word"
                />
              </div>

              <div>
                <label
                  htmlFor="editWhenToSay"
                  className="block text-sm font-medium text-gray-700"
                >
                  When to Say
                </label>
                <textarea
                  id="editWhenToSay"
                  value={currentvocabulary?.whenToSay || ""}
                  onChange={(e) =>
                    setCurrentvocabulary({
                      ...currentvocabulary,
                      whenToSay: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Describe when to use the word"
                />
              </div>

              <div>
                <label
                  htmlFor="editLessonNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson No
                </label>
                <input
                  type="number"
                  id="editLessonNo"
                  value={currentvocabulary?.lessonNo}
                  onChange={(e) =>
                    setCurrentvocabulary({
                      ...currentvocabulary,
                      lessonNo: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter Lesson Number"
                />
              </div>

             <div className="flex gap-5">
             <button
                type="submit"
                className="btn btn-primary  text-white  hover:btn-primary"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-primary  text-white  hover:btn-primary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
             </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyManagement;
