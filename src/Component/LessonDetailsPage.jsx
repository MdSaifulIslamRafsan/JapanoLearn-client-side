import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Confetti from "react-confetti";
const LessonDetailsPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const { data: lessonData } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () =>
      axiosPublic
        .get(`/api/lesson/${id}`, {
          withCredentials: true,
        })
        .then((res) => res.data.data),
  });

  const totalPage = Math.ceil(lessonData?.vocabulary.length / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const currentVocabulary = lessonData?.vocabulary.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleComplete = () => {
    setIsConfettiActive(true);
    setTimeout(() => {
      navigate("/lessons");
    }, 5000);
  };

  const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
    
  }

  return (
    <div>
      {isConfettiActive && (
        <Confetti
          className="w-full"
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        {lessonData?.lessonName}
      </h1>

      <div className="mx-5 md:mx-0">
        {currentVocabulary?.map((word, index) => (
          <div
          onClick={() => pronounceWord(word.word)}
            key={index}
            className="max-w-sm  p-10 mx-auto border-4 border-blue-400 my-10 shadow-xl rounded-md"
          >
            <p>
              <strong>Word:</strong> {word.word}
            </p>
            <p>
              <strong>Pronunciation:</strong> {word.pronunciation}
            </p>
            <p>
              <strong>Meaning:</strong> {word.meaning}
            </p>
            <p>
              <strong>When to Say:</strong> {word.whenToSay}
            </p>
          </div>
        ))}
      </div>

      <div className=" text-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>

        <span className="mx-4">
          Page {page} of {totalPage}
        </span>
        {page === totalPage ? (
          <button
            onClick={handleComplete}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonDetailsPage;
