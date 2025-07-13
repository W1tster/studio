import { Button } from "@/components/ui/button";
import { FileCard } from "@/components/file-card";
import { Upload } from "lucide-react";

const files = [
  { name: "Lecture Notes 1.pdf", type: "Notes", uploader: "Alex G.", uploadDate: "2024-05-10", votes: 125 },
  { name: "Mid-term Solved Paper.pdf", type: "Solved Paper", uploader: "Ben C.", uploadDate: "2024-05-08", votes: 98 },
  { name: "Core Textbook Decode Ch 1-5.docx", type: "Textbook Decode", uploader: "Casey D.", uploadDate: "2024-05-11", votes: 210 },
  { name: "Important Q&A.pdf", type: "Q&A", uploader: "Dana E.", uploadDate: "2024-04-20", votes: 77 },
];

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subjectName = params.subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{subjectName}</h1>
          <p className="text-muted-foreground">Browse and upload resources for this subject.</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {files.map((file, index) => (
          <FileCard key={index} {...file} />
        ))}
      </div>
    </div>
  );
}
