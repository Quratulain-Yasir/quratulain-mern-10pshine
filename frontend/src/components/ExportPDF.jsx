import pdfMake from "pdfmake/build/pdfmake.min";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

pdfMake.vfs = pdfFonts.vfs;

const ExportPDF = ({ note }) => {
  const exportAsPdf = () => {
    if (!note?.content) {
      alert("No content found!");
      return;
    }

    const html = htmlToPdfmake(note.content);

    const docDefinition = {
      content: html,
      pageSize: "A4",
      pageMargins: [20, 20, 20, 20],
    };

    pdfMake.createPdf(docDefinition).download(`${note.title || "note"}.pdf`);
  };

  return (
    <button onClick={exportAsPdf}>
      PDF document (.pdf)
    </button>
  );
};

export default ExportPDF;
