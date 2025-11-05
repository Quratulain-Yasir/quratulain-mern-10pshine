import React from "react"; 
import { Download } from "lucide-react";
import ExportPDF from "./ExportPDF"; 


const ExportNote = ({ note }) => {

  const exportAsTxt = () => {
  const temp = document.createElement("div");
  temp.innerHTML = note.content;      // put HTML inside div
  const plainText = temp.innerText;    // extract only text (no tags)

  const file = new Blob([plainText], { type: "text/plain" });
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${note.title || "note"}.txt`;
  a.click();
  };
 
 

  return (
    <div className="relative group mt-5">
      <button className="inline-flex gap-2 px-6 py-3 font-semibold bg-gray-300 hover:bg-gray-200 rounded shadow text-sm shadow-md shadow-black/30" >
        <Download size={18} />  Download
      </button>

      {/* Dropdown */}
      <div className="absolute mt-1 bg-white shadow-lg rounded hidden group-hover:block p-2 w-42">
        <button onClick={exportAsTxt} className="block w-full text-left p-1 hover:bg-gray-100 text-sm">
          Plain text (.txt)
        </button>
        <button className="block w-full text-left p-1 hover:bg-gray-100 text-sm">
          <ExportPDF note={note} />
        </button> 
      </div>
    </div>
  );
};

export default ExportNote;
