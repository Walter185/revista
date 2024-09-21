import React, { useEffect, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import HTMLFlipBook from "react-pageflip";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import db from '../../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function PDFViewer() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(""); 
  const { id } = useParams();

  // Fetch PDF URL from Firestore
  useEffect(() => {
    const getProductById = async () => {
      const product = await getDoc(doc(db, "revistas", id));
      if (product.exists()) {
        setPdf(product.data().pdf)
      } else {
        console.log("El producto no existe")
    }
  }
  getProductById()
  }, [id])
  

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

  function onPage(e) {
    setPageNumber(e.data + 1); // Actualizar el número de página al hacer flip
  }

  return (
    <div>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</div>

      {pdf ? ( // Condicional para renderizar el PDF solo si existe
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
      ) : (
        <p>Cargando PDF...</p> // Mensaje mientras se carga el PDF
      )}

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
