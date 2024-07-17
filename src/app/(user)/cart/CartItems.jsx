const CartItems = ({cart}) => {
  return ( 
    <div className="col-span-2 bg-red-400">
    {cart?.productDetail.map((p) => {
      return (
        <div className="bg-blue-400 mb-2" key={p._id}>
          <div>
            <p>{p.title}</p>
            <p>{p.price}</p>
          </div>
        </div>
      );
    })}
  </div>

  );
}
 
export default CartItems;