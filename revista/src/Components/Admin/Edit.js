import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import db, { storage } from "../../Firebase/firebase"
import { DeleteFile } from "../../Firebase/firebase";

function Edit() {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate()
    const { id } = useParams()

    const updateProduct = async (e) => {
        e.preventDefault()
        const product = doc(db, "products", id)
        const data = {
            title: title, 
            category: category, 
            description: description, 
            img1: img1,
            img2: img2, 
            price: price
        }
        await updateDoc(product, data)
        navigate("/show")
    }

    const getProductById = async (id) => {
        const product = await getDoc(doc(db, "products", id))
        if (product.exists()) {
            setTitle(product.data().title)
            setCategory(product.data().category)
            setDescription(product.data().description)
            setImg1(product.data().img1)
            setImg2(product.data().img2)
            setPrice(product.data().price)
        }
        else {
            console.log("El producto no existe")
        }
    }

     useEffect(() => {
        const getProductById = async () => {
            const product = await getDoc(doc(db, "products", id))
            if (product.exists()) {
                setTitle(product.data().title)
                setCategory(product.data().category)
                setDescription(product.data().description)
                setImg1(product.data().img1)
                setImg2(product.data().img2)
                setPrice(product.data().price)
            } else {
                console.log("El producto no existe")
            }
        }
        getProductById()
    }, [id])

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
                    // Update the state with the download URL
                    setImg1(downloadURL);
                });
            }
        );
    };

    const handleDeleteImage = async (imageURL) => {
        try {
            const imageRef = ref(storage, imageURL);
            await DeleteFile(imageRef);
            setImg1("");
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagen 1</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="form-control"
                            />
                            {img1 && (
                                <div>
                                    <img src={img1} alt="Preview" />
                                    <button onClick={() => handleDeleteImage(img1)}>Eliminar Imagen</button>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Imagen 2</label>
                            <input
                                type="text"
                                value={img2}
                                onChange={(e) => setImg2(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit