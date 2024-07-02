import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { firestore } from '../Firebase';
import axios from 'axios';

function AddProduct() {
  const url = "https://ecommerce-backend-bmf8.onrender.com";
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDesc: "",
    productMrp: 0,
    actualPrice: 0,
    brand: "",
    category: "",
    productImgUrl: "",
    productImgUrl2: "",
    productImgUrl3: "",
    keyFeature: ""
  });
  const [loading, setLoading] = useState(false);
  // const [imgurl, setImgUrl] = useState("");
  // const messageRef = useRef();
  const imageRef = useRef();
  const storage = getStorage();
  const auth = getAuth();
  const refCollection = collection(firestore, "message");

  const addProduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await axios.post(`${url}auth/addProduct`, productDetails, {
        headers: {
          'Content-Type': 'application/json'
          // Include any other headers you need here
        }
      });
      document.getElementById("infoAboutProductAdd").classList.remove("text-red-600")
      document.getElementById("infoAboutProductAdd").classList.add("text-green-500")
      document.getElementById("infoAboutProductAdd").innerHTML = "Product Added"
      setTimeout(() => {
        document.getElementById("infoAboutProductAdd").innerHTML = ""
      }, 3000)
      setProductDetails({
        productName: "",
        productDesc: "",
        productMrp: 0,
        actualPrice: 0,
        brand: "",
        category: "",
        productImgUrl: "",
        productImgUrl2: "",
        productImgUrl3: "",
        keyFeature: ""
      })
      setLoading(false)
    } catch (error) {

      document.getElementById("infoAboutProductAdd").classList.add("text-red-600")
      document.getElementById("infoAboutProductAdd").classList.remove("text-green-500")
      document.getElementById("infoAboutProductAdd").innerHTML = "Some Error Occurs"
      setTimeout(() => {
        document.getElementById("infoAboutProductAdd").innerHTML = ""
      }, 3000)
      setLoading(false)
    }


  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submit clicked");

    const files = imageRef.current.files;
    let imageUrls = [];

    // Upload each file and store the download URL
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        try {
          const snapshot = await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
    }

    const user = auth.currentUser;
    let accessToken = "";
    if (user) {
      try {
        accessToken = await user.getIdToken();
      } catch (error) {
        console.error("Error getting access token: ", error);
      }
    }

    const data = {
      ...productDetails,
      productImgUrls: imageUrls,
      accessToken: accessToken
    };

    try {
      await addDoc(refCollection, data);
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      productImgUrl: imageUrls[2],
      productImgUrl2: imageUrls[1],
      productImgUrl3: imageUrls[0],
    }));

    setLoading(false);
    // await addProduct();
    console.log(imageUrls);
    console.log(productDetails);
  };


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const response = await axios.get(`${url}auth/getAllCategory`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className='text-center'>
      <form className='AddProductForm p-20 grid grid-cols-2' onSubmit={addProduct}>
        <div className='text-center'>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="productName" className='pl-2'>Product Name</label>
              <input className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1' value={productDetails.productName} onChange={handleOnChange} type="text" name="productName" placeholder="Enter Product name" />
            </div>
          </div>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="productDesc" className='pl-2'>Product Description</label>
              <input className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1' value={productDetails.productDesc} onChange={handleOnChange} type="text" name="productDesc" placeholder="Enter Product Description" />
            </div>
          </div>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="productMrp" className='pl-2'>Product MRP</label>
              <input className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1' value={productDetails.productMrp} onChange={handleOnChange} type="number" name="productMrp" placeholder="Enter Product Mrp" />
            </div>
          </div>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="actualPrice" className='pl-2'>Product Sell Price</label>
              <input className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1' value={productDetails.actualPrice} onChange={handleOnChange} type="number" name="actualPrice" placeholder="Enter Product Sell price" />
            </div>
          </div>
        </div>
        <div className='text-center'>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col items-start'>
              <label htmlFor="imageUpload">Select Max 3 Images</label>
              <input type="file" id="imageUpload" name="imageUpload" onChange={handleSubmit} multiple accept="image/*" ref={imageRef} className='shadow-xl h-10 rounded-lg p-1 bg-white' />
            </div>
          </div>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="keyFeature" className='pl-2'>Product Key Feature</label>
              <input className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1' value={productDetails.keyFeature} onChange={handleOnChange} type="text" name="keyFeature" placeholder="Enter Product Key Features" />
            </div>
          </div>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="brand" className='pl-2'>Product Brand</label>
              <input className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1' value={productDetails.brand} onChange={handleOnChange} type="text" name="brand" placeholder="Enter Product Brand" />
            </div>
          </div>
          <div className='flex flex-col items-center m-4'>
            <div className="flex flex-col items-start">
              <label htmlFor="category" className='pl-2'>Product Category</label>
              <select className='w-72 h-10 rounded-lg border-2 shadow-lg p-1 mt-1 bg-white' value={productDetails.category} onChange={handleOnChange} name="category" id="category">
                <option value="" disabled>Enter Product Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.categoryName}>{category.categoryName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          {loading ? <span className="loader"></span> : <button type='submit' className='button border py-4 px-3 rounded-xl font-semibold text-white shadow-2xl build mx-2'>Add Product</button>}
          <div className="info font-bold text-3xl text-green-500 p-2 m-2 rounded-lg text-center" id="infoAboutProductAdd"></div>

        </div>

      </form>
    </div>
  );
}

export default AddProduct;
