"use client"

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"

//this bellow code for confirming the props in only in defined types in interface class
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage"
}


export const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }
      }
    />
  )
}