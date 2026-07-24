import { useState, useCallback } from "react";

const useFileUpload = (
  maxSizeMB = 5,
  acceptedTypes = ["image/jpeg", "image/png", "application/pdf"],
) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleSelect = useCallback(
    (selectedFile) => {
      setError(null);

      if (!selectedFile) return;

      if (!acceptedTypes.includes(selectedFile.type)) {
        setError(
          `Invalid file type. Accepted: ${acceptedTypes.map((t) => t.split("/")[1]).join(", ")}`,
        );
        return;
      }

      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeMB}MB`);
        return;
      }

      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
    },
    [maxSizeMB, acceptedTypes],
  );

  const reset = useCallback(() => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError(null);
  }, [preview]);

  return { file, preview, error, handleSelect, reset };
};

export default useFileUpload;
