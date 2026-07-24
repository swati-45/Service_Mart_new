import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLocal, setLocal } from "../utils/storage";
import { setCredentials } from "../store/slice/authSlice";
import {
  UploadCloud,
  X,
  File as FileIcon,
  Image as ImageIcon,
} from "lucide-react";
import useFileUpload from "../hooks/useFileUpload";

const FileUpload = ({
  label,
  onUploadComplete,
  maxSizeMB = 5,
  accept = ["image/jpeg", "image/png"],
}) => {
  const dispatch=useDispatch();
  const { file, preview, error, handleSelect, reset } = useFileUpload(
    maxSizeMB,
    accept,
  );
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelect(e.dataTransfer.files[0]);
    }
  };
const handleUpload = async () => {
  if (!file) return;

  try {
    setProgress(20);

    const formData = new FormData();
    formData.append("image", file);

    const token = getLocal("homefix_token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/profile/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setProgress(100);

    const updatedUser = response.data.data.user;

    setLocal("homefix_user", updatedUser);

    dispatch(
      setCredentials({
        user: updatedUser,
        token,
      })
    );

    if (onUploadComplete) {
      onUploadComplete(updatedUser);
    }
  } catch (err) {
    console.error(err);
    setProgress(0);
  }
};

  React.useEffect(() => {
  if (file) {
    handleUpload();
  }
}, [file]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      {!file ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept={accept.join(",")}
            onChange={(e) => {
              if (e.target.files && e.target.files[0])
                handleSelect(e.target.files[0]);
            }}
          />
          <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium">
            Click or drag file to this area to upload
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG (Max {maxSizeMB}MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-xl p-4 bg-white border-gray-200 relative">
          <button
            onClick={() => {
              reset();
              setProgress(0);
            }}
            className="absolute top-2 right-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FileIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {progress > 0 && progress < 100 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
