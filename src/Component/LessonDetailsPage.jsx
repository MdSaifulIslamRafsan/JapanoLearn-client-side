import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const LessonDetailsPage = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: lessonData, isLoading } = useQuery({
        queryKey: ["lesson"],
        queryFn: () =>
          axiosPublic
            .get(`/api/lesson/${id}`, {
              withCredentials: true,
            })
            .then((res) => res.data),
      });
console.log(lessonData)

    return (
        <div>
            
        </div>
    );
};

export default LessonDetailsPage;