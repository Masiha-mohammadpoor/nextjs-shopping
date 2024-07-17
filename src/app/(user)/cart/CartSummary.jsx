const CartSummary = ({ payDetail }) => {
  const { totalGrossPrice, totalOffAmount, totalPrice } = payDetail;

  return (
    <div className="col-span-1 bg-red-900">
      <h1>اطلاعات پرداخت</h1>
      <div className="w-full flex justify-between items-center">
        <span>جمع کل</span>
        <span>{totalGrossPrice}</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>تخفیف</span>
        <span>{totalOffAmount}</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>مبلغ قابل پرداخت</span>
        <span>{totalPrice}</span>
      </div>
    </div>
  );
};

export default CartSummary;
