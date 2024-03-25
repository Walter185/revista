import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, query, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { deleteObject, ref, getStorage, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);


export const DeleteFile = (imageRef) => {
    const StorageRef = ref(storage, imageRef);
    return deleteObject(StorageRef);
};

export const uploadFile = (file, imageRef, setProgress, setRemoteImg) => {
    const storageRef = ref(storage, imageRef);
    // 'file' comes from the Blob or File API
    const upload = uploadBytesResumable(storageRef, file);
    upload.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        },
        (error) => {
           console.log(error);
        },
        () => {
            getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                setRemoteImg({ url: downloadURL, imageRef: imageRef });
            });
        }
    );
}


export async function getAllProducts(){
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    return products;
}

export async function getAllVideos(){
    const videosRef = collection(db, "videos");
    const snapshot = await getDocs(videosRef);

    const videos = snapshot.docs.map(element => {
        let video = element.data();
        video.id = element.id;
        return video;
    });
    return videos;
}

export async function getAllCategorias(){
    const categoriasRef = collection(db, "Categorias");
    const snapshot = await getDocs(categoriasRef);

    const categorias = snapshot.docs.map(element => {
        let categoria = element.data();
        categoria.id = element.id;
        return categoria;
    });
    return categorias;
}

export async function getProductsByCategory(categoryid){
    const productsRef = collection(db, "products");
    const qry = query(productsRef, where("category", "==", categoryid));
    const snapshot = await getDocs(qry);

    const products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    return products;
}

export async function getUsados() {
    const productsRef = collection(db, "products");
    const qry = query(productsRef, where("category", "==", "usado")); // Filtrar por categoria "usados"
    const snapshot = await getDocs(qry);
  
    const products = snapshot.docs.map((element) => {
      const product = element.data();
      product.id = element.id;
      return product;
    });
  
    return products;
  }

//Como firebase solo tiene soporte para buscar por coincidencia 100%, decidi obtener toda la lista de productos y luego filtrar, aunque no sea lo mas eficiente.
export async function getProductsByName(searchid){
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    let products = snapshot.docs.map(element => {
        let product = element.data();
        product.id = element.id;
        return product;
    });

    products = products.filter((el)=>el.name.toLowerCase().includes(searchid.trim().toLowerCase()) || el.detail.toLowerCase().includes(searchid.trim().toLowerCase())|| el.codigo.toLowerCase().includes(searchid.trim().toLowerCase()));
    return products;
}

export async function getProduct(id){
    const productsRef = collection(db, "products");
    const docRef = doc(productsRef, id)
    const snapshot = await getDoc(docRef);

    return { ...snapshot.data(), id: snapshot.id };
}

export async function createOrder(order){
    const orderRef = collection(db, "orders");

    let response = await addDoc(orderRef, order);
    return response.id;
}

export async function getOrder(id){
    const orderRef = collection(db, "orders");
    const docRef = doc(orderRef, id)
    const snapshot = await getDoc(docRef);

    return { ...snapshot.data(), id: snapshot.id };
}

export default db;