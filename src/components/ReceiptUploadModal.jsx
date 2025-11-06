'use client';

import { useState, useRef } from 'react';

export default function ReceiptUploadModal({ isOpen, onClose }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = async (fileOrEvent) => {
    console.log("handle file change called");
    // Handle both File objects (from drag-drop) and events (from input)
    const file = fileOrEvent instanceof File ? fileOrEvent : fileOrEvent.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadend =async () => {
      const base64String = reader.result;
      setUploadedImage(base64String);
        try{
            const response = await fetch('/api/analyze-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ receipt: base64String }),
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
            }
        }catch (e) {
            console.error("Error analyzing image:", e);
            alert("Error analyzing image");
        }finally {
            setIsLoading(false);
        }
    };
 
    reader.readAsDataURL(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      console.log('File dropped:', file);
      handleFileChange(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-charcoal rounded-xl shadow-2xl w-full max-w-lg p-6 lg:p-8 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-charcoal dark:text-white">Scan Your Receipt</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          {isLoading ? (
            <div className="border-2 border-dashed border-emerald-green/30 bg-emerald-green/5 dark:border-emerald-green/50 dark:bg-emerald-green/10 rounded-lg p-8 lg:p-12 flex flex-col items-center justify-center">
              <svg className="animate-spin h-12 w-12 text-emerald-green" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
              </svg>
              <p className="mt-4 text-charcoal dark:text-white font-semibold">Scanning your receipt...</p>
              <p className="text-medium-gray dark:text-gray-400 text-sm">This might take a moment.</p>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 lg:p-12 flex flex-col items-center justify-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <span className="material-symbols-outlined text-5xl text-emerald-green">cloud_upload</span>
              <p className="mt-4 text-charcoal dark:text-white font-semibold">
                Drag &amp; drop a photo of your receipt
              </p>
              <p className="text-medium-gray dark:text-gray-400 text-sm">
                or choose a file to automatically add ingredients.
              </p>
              <button
                onClick={handleChooseFile}
                className="mt-6 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-emerald-green/10 dark:bg-emerald-green/20 text-emerald-green text-sm font-bold leading-normal tracking-wide hover:bg-emerald-green/20 dark:hover:bg-emerald-green/30"
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
