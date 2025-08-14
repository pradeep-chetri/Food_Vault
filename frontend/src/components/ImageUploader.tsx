import { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { Upload, Image, AlertCircle, CheckCircle, X, Loader2 } from "lucide-react";
import axios from "axios";

interface ImageUploaderProps {
  folder: string;
  onUploadComplete: (url: string) => void;
  maxFileSize?: number; // in bytes
  acceptedFormats?: string[];
}

interface UploadResponse {
  fileId: string;
  name: string;
  url: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  fileType: string;
  thumbnailUrl?: string;
  orientation: number;
  message?: string;
  help?: string;
  versionInfo: { id: string; name: string };
}

export default function ImageUploader({
  folder,
  onUploadComplete,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  acceptedFormats = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const publicKey = import.meta.env.VITE_IK_PUBLIC_KEY
  const urlEndpoint = import.meta.env.VITE_IK_URLENDPOINT

  const handleUploadStart = () => {
    setIsUploading(true);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
  };

  const handleUploadProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      setUploadProgress(Math.round(percentComplete));
    }
  };

  const handleUploadSuccess = (res: UploadResponse) => {
    setIsUploading(false);
    setSuccess(true);
    setUploadProgress(100);
    onUploadComplete(res.url);
  };

  const handleUploadError = (err: unknown) => {
    setIsUploading(false);
    setUploadProgress(0);
    
    let errorMessage = "Upload failed. Please try again.";
    if (err && typeof err === 'object' && 'message' in err) {
      errorMessage = String(err.message);
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    
    setError(errorMessage);
    console.error("Upload Error: ", err);
  };

  const clearError = () => setError(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const authenticator = async (): Promise<{ signature: string; expire: number; token: string }> => {
    try {
      const headers = {
        Authorization: 'Bearer your-access-token',
        CustomHeader: 'CustomValue',
      };

      const response = await axios.get('http://localhost:8000/api/image/upload', {
        headers,
      });

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }

      const { signature, expire, token } = response.data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="w-full">
        {/* Error Message */}
        {error && (
          <div className="mb-3 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Area - matches form styling */}
        <div
          className={`
            relative border-2 border-dashed rounded-xl bg-white shadow-sm transition-all duration-200
            ${dragOver 
              ? 'border-lime-400 bg-lime-50' 
              : success
              ? 'border-green-400 bg-green-50'
              : isUploading
              ? 'border-lime-400 bg-lime-50'
              : 'border-zinc-300 hover:border-lime-400 hover:bg-lime-50'
            }
            ${isUploading ? 'cursor-wait' : 'cursor-pointer'}
          `}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={() => setDragOver(false)}
        >
          <div className="px-6 py-8 text-center">
            {isUploading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-lime-600 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-zinc-700 mb-2">
                    Uploading your image... {uploadProgress}%
                  </p>
                  <div className="w-48 h-2 bg-zinc-200 rounded-full mx-auto overflow-hidden">
                    <div
                      className="h-full bg-lime-500 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Image uploaded successfully!
                  </p>
                  <p className="text-xs text-green-600">
                    You can upload a new image to replace this one
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-lime-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">
                    {acceptedFormats.map(f => f.replace('.', '')).join(', ').toUpperCase()} up to {formatFileSize(maxFileSize)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Image className="w-4 h-4" />
                  <span className="text-xs">High quality images work best</span>
                </div>
              </div>
            )}
          </div>

          {/* Hidden IKUpload Component */}
          <IKUpload
            folder={folder}
            fileName={`${Date.now()}_${Math.random().toString(36).substring(2)}`}
            onError={handleUploadError}
            onSuccess={handleUploadSuccess}
            onUploadStart={handleUploadStart}
            onUploadProgress={handleUploadProgress}
            validateFile={(file: File) => {
              // File size validation
              if (file.size > maxFileSize) {
                setError(`File must be smaller than ${formatFileSize(maxFileSize)}`);
                return false;
              }

              // File type validation
              const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
              if (!acceptedFormats.includes(fileExtension || '')) {
                setError(`Please select a valid image file (${acceptedFormats.join(', ')})`);
                return false;
              }

              return true;
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={acceptedFormats.join(',')}
          />
        </div>
      </div>
    </IKContext>
  );
}