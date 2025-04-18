// import React, { useState, useEffect } from 'react';
// import './ListProduct.css'
// import cross_icon from '../../assets/cross_icon.png'
// const ListProduct = () => {

//    const [allproducts,setAllProducts]=useState([]);
//    const fetchInfo = async ()=>{
//     await fetch('http://localhost:4000/allproducts').then((res)=>res.json().then((data)=>{setAllProducts(data)}));
//    }
//    useEffect(()=>{
//       fetchInfo();
//    },[])
//    const remove_product= async (id)=>{
//       await fetch('http://localhost:4000/removeproduct',{
//          method:'POST',
//          headers:{ 
//               Accept: 'application/json',
//              'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({id:id}),
//       })
//       await fetchInfo();
//    }
//   return (
//     <div className='list-product'>
//        <h1>All Products List</h1>
//        <div className='listproduct-format-main'>
//           <p>Old Price</p>
//           <p>Title</p>
//           <p>Old Price</p>
//           <p>New Price</p>
//           <p>Category</p>
//           <p>Remove</p>
//        </div>
//        <div className='listproduct-allproducts'>
//                <hr/>
//                {allproducts.map((product,index)=>{
//                   return <><div key={index} className='listproduct-formate-main listproduct-formate'>
//                     <img src={product.image} alt="" className='litproduct-product-icon'></img>
//                     <p>{product.name}</p>
//                     <p>${product.old_price}</p>
//                     <p>${product.new_price}</p>
//                     <p>{product.category}</p>
//                     <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt=""/>
//                   </div>
//                   <hr/>
//                   </>
//                })}
//        </div>
//     </div>
//   )
// }

// export default ListProduct


//chatgpt
import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      await fetchInfo();
    } catch (error) {
      console.error('Remove product error:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className='listproduct-format-main listproduct-format'>
              <img
                src={product.image}
                alt=''
                className='listproduct-product-icon'
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => removeProduct(product.id)}
                className='listproduct-remove-icon'
                src={cross_icon}
                alt='Remove'
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
