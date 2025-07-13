'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FileCard } from "@/components/file-card";
import { Upload } from "lucide-react";

const myFiles = [
  { name: "Final Year Project Draft.docx", type: "Report", uploader: "Me", uploadDate: "2024-05-12", votes: 0 },
  { name: "Thermodynamics_cheatsheet.pdf", type: "Notes", uploader: "Me", uploadDate: "2024-04-30", votes: 0 },
  { name: "DSA_Interview_Prep.md", type: "Q&A", uploader: "Me", uploadDate: "2024-04-15", votes: 0 },
];


export default function WorkspacePage() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          console.log("File selected:", file.name);
          // Here you would typically handle the file upload process
        }
    };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personal Workspace</h1>
          <p className="text-muted-foreground">Your private space to store and manage study materials.</p>
        </div>
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
        </>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {myFiles.map((file, index) => (
          <FileCard key={index} {...file} />
        ))}
        {myFiles.length === 0 && (
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">Your workspace is empty</h3>
                <p className="text-muted-foreground mt-2 mb-4">Upload your first file to get started!</p>
                 <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                </>
            </div>
        )}
      </div>
    </div>
  );
}
