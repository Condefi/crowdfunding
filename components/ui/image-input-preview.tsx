"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CloudUploadIcon, Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageInputPreviewProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onUpload?: () => void;
  width?: number;
  height?: number;
}

export default function ImageInputPreview({
  file,
  onFileChange,
  onUpload,
  width = 200,
  height = 200,
}: ImageInputPreviewProps) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    onFileChange(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleUpload = () => {
    if (onUpload) {
      setLoading(true);
      onUpload();
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {file && previewUrl ? (
        <div className="space-y-2">
          <Image
            src={previewUrl}
            width={width}
            height={height}
            alt="Preview"
            className="object-cover"
            onLoad={() => {
              if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
              }
            }}
          />

          <div className="flex items-center justify-between rounded-md bg-accent px-4 py-2">
            <div className="truncate text-sm font-medium text-white">
              {file.name}
            </div>

            <div className="flex items-center gap-3 p-2 ">
              <Tooltip>
                <TooltipTrigger asChild>
                  {loading ? (
                    <Loader2Icon className="h-4 w-4 text-white animate-spin" />
                  ) : (
                    <UploadIcon
                      className="h-4 w-4 text-white cursor-pointer"
                      onClick={handleUpload}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <XIcon
                    className="h-5 w-5 text-white cursor-pointer"
                    onClick={() => onFileChange(null)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove</p>
                </TooltipContent>
              </Tooltip>
              <span className="sr-only">Upload</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-1 flex justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 ${
            isDragOver
              ? "border-accent bg-accent/10 text-accent"
              : "border-gray-300 dark:border-gray-600 hover:border-accent dark:hover:border-accent"
          }`}
        >
          <div className="space-y-1 text-center">
            <CloudUploadIcon
              className={`mx-auto h-12 w-12 ${
                isDragOver ? "text-accent" : "text-gray-400 dark:text-gray-600"
              }`}
            />
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-transparent font-medium text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:text-accent/80"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileSelect}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Recommended size: {width}x{height}px
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
