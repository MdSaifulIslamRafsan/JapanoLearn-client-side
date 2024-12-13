import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const LessonComponent = () => {
  const axiosPublic = useAxiosPublic();

  const { data: lessonData, isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: () =>
      axiosPublic
        .get("/api/lesson", {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading lessons...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {lessonData?.data?.map((lesson) => (
        <Link
          key={lesson._id}
          to={`/lesson/${lesson.lessonNumber}`}
          className="bg-white shadow-lg p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <h3 className="text-lg font-bold">{lesson.lessonName}</h3>
          <p>Lesson Number: {lesson.lessonNumber}</p>
          <p>Vocabulary Count: {lesson.vocabularyCount}</p>
        </Link>
      ))}
    </div>
  );
};

export default LessonComponent;
