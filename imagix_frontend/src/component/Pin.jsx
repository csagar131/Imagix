import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// unique resource indeintrfied provide uniq id for each post
// import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
// import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { urlFor, client } from "../client";

const Pin = ({ pin }) => {
//   const navigate = useNavigate();

  // whenever the mouse entered the post region show options
  const [postHovered, setPostHovered] = useState(false);

  // it may be a saved count for this perticular post
  //const [savingPost, setSavingPost] = useState(false)

  const { postedBy, image, _id } = pin;

  // check if user is logged and get the user from localstorage
  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-4">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        // onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img
            className="rounded-lg w-full "
            src={urlFor(image).width(250).url()}
            alt="user-post"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 "
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
