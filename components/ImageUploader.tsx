
<<<<<<< HEAD
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { UploaderMode } from '../types';

interface ImageUploaderProps {
  onImageReady: (base64Image: string | null) => void;
  image: string | null;
  mode: UploaderMode;
  onModeChange: (mode: UploaderMode) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageReady, image, mode, onModeChange }) => {
=======
import React, { useState, useRef, useCallback } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ImageUploaderProps {
  onImageReady: (base64Image: string) => void;
  image: string | null;
}

type Mode = 'upload' | 'camera';

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageReady, image }) => {
  const [mode, setMode] = useState<Mode>('upload');
>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageReady(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fallback to user-facing camera if environment fails
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsCameraOn(true);
        }
      } catch (fallbackErr) {
        console.error("Fallback camera error:", fallbackErr);
        alert("Could not access camera. Please check permissions.");
      }
    }
  }, [stopCamera]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        onImageReady(dataUrl);
        stopCamera();
      }
    }
  };
  
<<<<<<< HEAD
  const handleModeChange = (newMode: UploaderMode) => {
    if (mode === newMode) return;
    stopCamera();
    onModeChange(newMode);
  };

  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    // Cleanup function to stop camera when component unmounts or mode changes
    return () => {
      stopCamera();
    };
  }, [mode, startCamera, stopCamera]);


  const clearImage = () => {
    onImageReady(null);
=======
  const handleModeChange = (newMode: Mode) => {
    stopCamera();
    setMode(newMode);
    if(newMode === 'camera') {
        startCamera();
    }
  };

  const clearImage = () => {
    onImageReady(''); // Use empty string to signify clearing
>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 mb-4">
        <button onClick={() => handleModeChange('upload')} className={`flex-1 py-3 text-center font-semibold flex items-center justify-center gap-2 ${mode === 'upload' ? 'border-b-2 border-eco-green text-eco-green' : 'text-gray-500 hover:bg-gray-100'}`}>
          <UploadIcon className="w-5 h-5" /> Upload File
        </button>
        <button onClick={() => handleModeChange('camera')} className={`flex-1 py-3 text-center font-semibold flex items-center justify-center gap-2 ${mode === 'camera' ? 'border-b-2 border-eco-green text-eco-green' : 'text-gray-500 hover:bg-gray-100'}`}>
          <CameraIcon className="w-5 h-5" /> Use Camera
        </button>
      </div>

      <div className="aspect-video w-full rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {image ? (
            <>
                <img src={image} alt="Selected item" className="object-contain h-full w-full" />
                <button onClick={clearImage} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors">
                    <XCircleIcon className="w-6 h-6" />
                </button>
            </>
        ) : (
          mode === 'upload' ? (
            <div 
              className="w-full h-full border-4 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files); }}
            >
              <UploadIcon className="w-12 h-12 text-gray-400 mb-2" />
              <p className="font-semibold text-gray-600">Drag & drop an image here</p>
              <p className="text-gray-500">or</p>
              <label className="mt-2 bg-white px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                Browse file
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files)} />
              </label>
            </div>
          ) : (
            <div className="w-full h-full relative">
<<<<<<< HEAD
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover bg-black"></video>
=======
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
              {isCameraOn && (
                <button onClick={captureImage} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-eco-green hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <CameraIcon className="w-8 h-8 text-eco-green" />
                </button>
              )}
               <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          )
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
