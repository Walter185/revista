import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage, DeleteFile } from "../../Firebase/firebase";

const Create = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [pdf, setPdf] = useState("");
    const navigate = useNavigate()
    const productsCollection = collection(db, "revistas")

    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {
            name: name, 
            category: category,
            description: description, 
            imgUrl: imgUrl, 
            pdf: pdf
        })
        navigate("/show")
    }

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
                    <h1>Crear Revista</h1>

                    <form onSubmit={store}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripcion</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detalle del producto"
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
                            <label className="form-label">Subir Imagen</label>
                            <input
                                type="file"
                                accept="image/*;capture=camera"
                                onChange={handleUpload}
                                className="form-control"
                            />
                            {imgUrl && (
                                <div>
                                    <img src={imgUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                    <button onClick={() => handleDeleteFile(imgUrl)}>Eliminar Imagen</button>
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

                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create;