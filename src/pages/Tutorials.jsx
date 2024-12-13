import { useState } from "react";
import {  MdOutlineCancel } from "react-icons/md";
import Modal from "react-modal";

const videos = [
  "https://www.youtube.com/embed/sISIVKJh_EA?si=sjh6mduVjqdVlx1R",
  "https://www.youtube.com/embed/rGrBHiuPlT0?si=ZOB64ecxCNv9cm7J",
  "https://www.youtube.com/embed/bOUqVC4XkOY?si=Q_sP78r-dsjL0-vq",
  "https://www.youtube.com/embed/JnoZE51WZg4?si=wqS9JFzzYLy0hJ74",
  "https://www.youtube.com/embed/k74yjmfFb_A?si=mYRuWPCev1XQ08-2",
  "https://www.youtube.com/embed/KUIWRsVZZZA?si=Kuh5SpVNxHFQOqSV",
  "https://www.youtube.com/embed/ZGGufccTLso?si=_1JIOX9yDHt9xAwl",
  "https://www.youtube.com/embed/i1ORF_lp1oU?si=CsV0udc9leuIT3Nb",
];

const getThumbnail = (videoUrl) => {
  const videoId = videoUrl.split("/embed/")[1].split("?")[0];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const TutorialPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo("");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="relative cursor-pointer group">
            {/* Thumbnail */}
            <img
              src={getThumbnail(video)}
              alt={`Thumbnail for video ${index + 1}`}
              className="rounded-lg w-full h-96 object-cover shadow-lg"
            />
            {/* Play Button */}
            <div
              onClick={() => openModal(video)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                className="bg-white rounded-full shadow-lg text-black"
              >
               <img src="play.gif" className="w-16 rounded-full" alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="relative top-7 w-full max-w-4xl">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white text-2xl"
          >
           <MdOutlineCancel className="text-4xl text-red-500" />

          </button>
          <iframe
            src={selectedVideo}
            title="Video Player"

            allow="autoplay"
            allowFullScreen
           className="w-full aspect-video "
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default TutorialPage;