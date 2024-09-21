import React, { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdf from '../../Assets/Pdf/Agricultura274.pdf';
import HTMLFlipBook from "react-pageflip";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function PDFViewer() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const width = 300;
  const height = 424;

  const Page = React.forwardRef(({ pageNumber }, ref) => {
    return (
      <div ref={ref}>
        <PdfPage pageNumber={pageNumber} width={width} height={height} />
      </div>
    );
  });

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  function onPage(e) {
    console.log(e);
  }

  return (
    <div>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</div>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <HTMLFlipBook
          width={width}
          height={height}
          size="fixed"
          minWidth={width}
          maxWidth={width}
          minHeight={height}
          maxHeight={height}
          showPageCorners={false}
          maxShadowOpacity={0.5}
          onFlip={onPage}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              number={index + 1}
            />
          ))}
        </HTMLFlipBook>
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
;
