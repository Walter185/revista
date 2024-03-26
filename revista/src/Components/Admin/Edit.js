import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage, DeleteFile } from "../../Firebase/firebase"

function Edit() {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [pdf, setPdf] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate()
    const { id } = useParams()
    
    useEffect(() => {
       const getProductById = async () => {
           const product = await getDoc(doc(db, "revistas", id))
           if (product.exists()) {
               setName(product.data().name)
               setCategory(product.data().category)
               setDescription(product.data().description)
               setImgUrl(product.data().imgUrl)
               setPdf(product.data().pdf)
           } else {
               console.log("El producto no existe")
           }
       }
       getProductById()
   }, [id])

    const updateProduct = async (e) => {
        e.preventDefault()
        const product = doc(db, "revistas", id)
        const data = {
            name: name, 
            category: category, 
            description: description, 
            imgUrl: imgUrl,
            pdf: pdf
        }
        await updateDoc(product, data)
        navigate("/show")
    }

 

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            null,
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    };

    
    const handleUploadPdf = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `pdfs/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            null,
            (error) => {
                console.error('Error uploading PDF:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // Update the state with the download URL
                    setPdf(downloadURL);
                });
            }
        );
    };

    const handleDeleteImage = async (imageURL) => {
        try {
            const imageRef = ref(storage, imageURL);
            await DeleteFile(imageRef);
            setImgUrl("");
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    
    const handleDeleteFile = async (fileURL) => {
        try {
            const imageRef = ref(storage, fileURL);
            await DeleteFile(imageRef);
            if (fileURL === imgUrl) {
                setImgUrl("");
            } else if (fileURL === pdf) {
                setPdf("");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Editar Producto</h1>

                    <form onSubmit={updateProduct}>
                        <div className="mb-3">
                            <label className="form-label">Titulo</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                            />
                        </div>
                      
                        <div className="mb-3">
                            <label className="form-label">Categoria</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="revista">Revista</option>
                                <option value="sponsor">Sponsor</option>

                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagen</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="form-control"
                            />
                            {imgUrl && (
                                <div>
                                    <img src={imgUrl} alt="Preview" />
                                    <button onClick={() => handleDeleteImage(imgUrl)}>Eliminar Imagen</button>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pdf</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleUploadPdf}
                                className="form-control"
                            />
                            {pdf && (
                                <div>
                                    <a href={pdf} target="_blank" rel="noopener noreferrer">Ver PDF</a>
                                    <button onClick={() => handleDeleteFile(pdf)}>Eliminar PDF</button>
                                </div>
                            )}
                        </div>
                
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit