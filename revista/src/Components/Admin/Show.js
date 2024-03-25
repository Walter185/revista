import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../Firebase/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";

const Div = styled.div`
    margin-left: 2px;
    margin-right: 2px !important;
`;
const TH = styled.th`
    max-width: 30px;
    max-height: 30px;
`;
const TD = styled.td`
    max-width: 30px;
    max-height: 30px;
`;
const MySwal = withReactContent(Swal)

const Show = () => {
    const [products, SetProducts] = useState([]);
    const productsCollection = collection(db, "products")

    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        SetProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
    }

    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    const confirmDelete = (id) => {
        Swal.fire({
            name: 'Estás seguro?',
            text: "No podrás recuperar lo borrado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire(
                    'Borrado!',
                    'El archivo ha sido borrado.',
                    'success'
                )
            }
        })

    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Div>
            <div className="row">
                <h3>Panel del administrador</h3>
                <div className="col">
                    <Button>
                        <Link to="/create">Crear</Link>
                    </Button>


                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <TH>Nombre</TH>
                                <TH>Descripcion</TH>
                                <TH>Categoria</TH>
                                {/* <TH>Detalle</TH>
                            <TH>Extra</TH> */}
                                <TH>Precio</TH>
                                {/* <TH>Stock</TH> */}
                                {/* <TH>Ubicacion</TH>
                            <TH>Imagen</TH>
                            <TH>Pdf</TH> */}
                                <TH>E/B</TH>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <TD>{product.title}</TD>
                                    <TD>{product.description}</TD>
                                    <TD>{product.category}</TD>
                                    {/* <TD>{product.detail}</TD>
                                <TD>{product.extra}</TD> */}
                                    <TD>{product.price}</TD>
                                    {/* <TD>{product.location}</TD>
                                <TD>{product.imgUrl}</TD>
                                <TD>{product.pdf}</TD> */}
                                    <TD>
                                        <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i>Editar</Link><span>   </span>
                                        <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i>Borrar</button>
                                    </TD>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Div>

    )
}

export default Show