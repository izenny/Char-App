// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../Redux/AuthSlice";
// import toast from "react-hot-toast";
// import userIcon from "../assets/UserIcon.png";
// const Profile = () => {
//   const { user } = useSelector((state) => state.auth);
//   // const dispatch = useDispatch();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [selectedImg, setSelectedImg] = useState(null);
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file)); // Preview image
//     } else {
//       toast.error("Please select a valid image file.");
//     }
//   };
//   const updateProfilePic = async () => {
//     if (!selectedFile) {
//       console.log("select image");
//     }
//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       await updateProfile({ profilepic: base64Image });
//     };
//     setSelectedFile(null);
//     setPreview(null);
//     toast.success("Profile updated successfully.");
//   };

//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-500">
//         No user data available.
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center h-full ">
//       <div className="bg-slate-200 shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
//         {/* Profile Picture */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={
//               preview || user?.profilePic || userIcon
//             }
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
//           />
//         </div>

//         {/* User Info */}
//         <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
//         <p className="text-gray-600">{user.email}</p>

//         <div className="mt-6 text-left space-y-2">
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Account Created:</span>
//             <span className="text-gray-500">
//               {new Date(user.createdAt).toLocaleDateString()}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Last Updated:</span>
//             <span className="text-gray-500">
//               {new Date(user.updatedAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>

//         {/* Update Profile Picture */}
//         <div className="mt-6 space-y-2">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//           <button
//             onClick={updateProfilePic}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//           >
//             Upload New Profile Picture
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../assets/UserIcon.png";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile } from "../Redux/AuthSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setLoading(true); // Start loading while processing the file

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      await dispatch(updateProfile({ profilepic: base64Image }));
      setLoading(false); // Stop loading once image is ready
    };
    reader.onerror = () => {
      toast.error("Error loading image. Please try again.");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-3 h-full items-center">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="relative flex flex-col items-center mt-5">
        <div className="avatar relative ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          ) : (
            <img
              src={imagePreview || user?.ProfilePic || userIcon}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>

        <label
          htmlFor="file-upload"
          className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer shadow-md"
        >
          <Edit className="text-white w-5 h-5" />
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-medium">{user?.username || "Guest"}</h2>
        <p className="text-slate-200">{user?.email || "No email provided"}</p>
      </div>
    </div>
  );
};

export default Profile;
