import React, { useEffect, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// import pdf from '../../Assets/Pdf/Agricultura274.pdf';
import HTMLFlipBook from "react-pageflip";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import db, { getRevistas } from '../../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import "./PDFViewer.css"
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export function PDFViewer() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState("");
  const [description, setDescription] = useState();
  const { id } = useParams()

  useEffect(() => {
    const getProductById = async () => {
        const product = await getDoc(doc(db, "revistas", id))
        if (product.exists()) {
          setPdf(product.data().pdf)
          setDescription(product.data().description)
      } else {
          console.log("El producto no existe")
      }
  }
  getProductById()
}, [id])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const width = 700;
  const height = 600;

  const Page = React.forwardRef(({ pageNumber }, ref) => {
    return (
      <div ref={ref}>
        <PdfPage pageNumber={pageNumber} width={width} height={height}/>
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
    <div className='contenedor'>
      <div className='description'>{description}</div>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <HTMLFlipBook
         width={width}
         height={height}
         minWidth={width}
         maxWidth={width}
         minHeight={height}
         maxHeight={height}
          showPageCorners={true}
          maxShadowOpacity={0.5}
          onFlip={onPage}
          drawShadow={true}
          autoSize={true}
          clickEventForward={false}
          mobileScrollSupport={true}
          singlePage={true}
          React={true}
          // useMouseEvents={false} 
          showCover={true}
          startPage={1}
        
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

      <p className='description'>
        Total de {numPages * 2}
      </p>
    </div>
  );
}
;
