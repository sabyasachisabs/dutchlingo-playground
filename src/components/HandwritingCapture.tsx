import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Camera, Upload } from 'lucide-react';

interface HandwritingCaptureProps {
  onCapture: (imageData: string) => void;
}

export function HandwritingCapture({ onCapture }: HandwritingCaptureProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      onCapture(imageData);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onCapture(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Handwriting Capture</CardTitle>
        <CardDescription>
          Capture your handwriting using your camera or upload an image
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCameraActive ? (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg border"
            />
            <div className="flex gap-2">
              <Button onClick={captureImage}>Capture</Button>
              <Button variant="destructive" onClick={stopCamera}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Button onClick={startCamera} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Use Camera
            </Button>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 