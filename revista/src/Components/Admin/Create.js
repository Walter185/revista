import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import db from "../../Firebase/firebase"

const Create = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate()
    const productsCollection = collection(db, "products")

    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {title: title, category: category,
            description: description, img1: img1, img2: img2, price: price})
        navigate("/show")
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Crear Producto</h1>

                    <form onSubmit={store}>
                        {/* <div className="mb-3">
                            <label className="form-label">Codigo</label>
                            <input
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Codigo del producto"
                                className="form-control"
                            />
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Nombre del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Detalle</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detalle del producto"
                                className="form-control"
                            />
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Extra 1</label>
                            <input
                                type="text"
                                value={extra1}
                                onChange={(e) => setExtra1(e.target.value)}
                                placeholder="Extra 1 del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra 2</label>
                            <input
                                type="text"
                                value={extra2}
                                onChange={(e) => setExtra2(e.target.value)}
                                placeholder="Extra 2 del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra 3</label>
                            <input
                                type="text"
                                value={extra3}
                                onChange={(e) => setExtra3(e.target.value)}
                                placeholder="Extra 3 del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra 4</label>
                            <input
                                type="text"
                                value={extra4}
                                onChange={(e) => setExtra4(e.target.value)}
                                placeholder="Extra 4 del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra 5</label>
                            <input
                                type="text"
                                value={extra5}
                                onChange={(e) => setExtra5(e.target.value)}
                                placeholder="Extra 5 del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Extra 6</label>
                            <input
                                type="text"
                                value={extra6}
                                onChange={(e) => setExtra6(e.target.value)}
                                placeholder="Extra 6 del producto"
                                className="form-control"
                            />
                        </div> */}
                             <div className="mb-3">
                            <label className="form-label">Categoria</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Extra 3 del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Imagen</label>
                            <input
                                type="text"
                                value={img1}
                                onChange={(e) => setImg1(e.target.value)}
                                placeholder="Imagen del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Imagen 2</label>
                            <input
                                type="text"
                                value={img2}
                                onChange={(e) => setImg2(e.target.value)}
                                placeholder="Imagen del producto"
                                className="form-control"
                            />
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Url de Imagen 3</label>
                            <input
                                type="text"
                                value={imgUrl3}
                                onChange={(e) => setImgUrl3(e.target.value)}
                                placeholder="Imagen del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Imagen 4</label>
                            <input
                                type="text"
                                value={imgUrl4}
                                onChange={(e) => setImgUrl4(e.target.value)}
                                placeholder="Imagen del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Imagen Pdf</label>
                            <input
                                type="text"
                                value={imgUrlPdf}
                                onChange={(e) => setImgUrlPdf(e.target.value)}
                                placeholder="Imagen del Pdf"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pdf</label>
                            <input
                                type="text"
                                value={pdf}
                                onChange={(e) => setPdf(e.target.value)}
                                placeholder="PDF del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Video</label>
                            <input
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="url de Video 1"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Url de Video 2</label>
                            <input
                                type="text"
                                value={videoUrl2}
                                onChange={(e) => setVideoUrl2(e.target.value)}
                                placeholder="url de Video 2"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ubicacion</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Ubicacion del producto"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input
                                type="text"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Stock del producto"
                                className="form-control"
                            />
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input
                                type="num"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Precio del producto"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create