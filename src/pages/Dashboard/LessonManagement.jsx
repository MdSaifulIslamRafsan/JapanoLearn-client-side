import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DataTable from "react-data-table-component";

const LessonManagement = () => {
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [lessonName, setLessonName] = useState("");

    const { data: lessonData, refetch, isLoading } = useQuery({
        queryKey: ["lessons"],
        queryFn: () =>
            axiosPublic
                .get("/api/lesson", {
                    withCredentials: true,
                })
                .then((res) => res.data),
    });
    const handleEditClick = (lesson) => {
        setCurrentLesson(lesson);
        setLessonName(lesson.lessonName);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        axiosPublic
            .patch(
                `/api/lesson/${currentLesson.lessonNumber}`,
                { lessonName },
                { withCredentials: true }
            )
            .then((res) => {
                setIsModalOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                    text: res?.data?.message ,
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
                console.error("Error updating lesson:", error);
            });
    };


    const handleDelete = (lessonNumber) => {
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
                   .delete(`/api/lesson/${lessonNumber}`, {
                        withCredentials: true,
                    })
                   .then(() => {
                        Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
                        refetch();
                    })
                   .catch((error) => {
                        Swal.fire("Error!", error.message, "error");
                    });
            }
        });
    }

    const columns = [
        {
            name: "Lesson Number",
            selector: (lesson) => lesson.lessonNumber,
        },
        {
            name: "Lesson Name",
            selector: (lesson) => lesson.lessonName,
        },
        {
            name: "Vocabulary Count",
            selector: (lesson) => lesson.vocabularyCount,
        },
        {
            name: "Edit",
            cell: (lesson) => (
                <button
                    className="btn btn-primary hover:btn-primary text-white"
                    onClick={() => handleEditClick(lesson)}
                >
                    Edit
                </button>
            ),
        },
        {
            name: "Delete",
            cell: (lesson) => (
                <button onClick={() => handleDelete(lesson.lessonNumber)} className="btn btn-primary hover:btn-primary text-white">
                    Delete
                </button>
            ),
        },
    ];

   

    return (
        <div>
            <DataTable columns={columns} data={lessonData?.data} pagination />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-5 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Edit Lesson</h2>
                        <input
                            type="text"
                            className="border rounded p-2 w-full mb-4"
                            value={lessonName}
                            onChange={(e) => setLessonName(e.target.value)}
                        />
                        <button
                            className="btn btn-primary hover:btn-primary text-white mr-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-primary hover:btn-primary"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonManagement;
