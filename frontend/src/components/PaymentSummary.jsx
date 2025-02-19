import React from 'react';

const PaymentSummary = ({ total, handlePayment, loading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Total: ₹{total}</h2>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Make Payment"}
      </button>
    </div>
  );
};

export default PaymentSummary;