'use client';

import React, { useState } from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  id,
  type = 'text',
}) => {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className="text-sm text-app-text pb-2 block"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-md border border-app-lightbrown focus:outline-none focus:ring-2 focus:ring-offset-app-blue"
      />
    </div>
  );
};

const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  return (
    <div className="flex flex-col items-center min-h-screen w-full py-16 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-app-text mb-6">
          Credit Card Information
        </h2>
        <Input
          label="Card Number"
          value={cardNumber}
          onChange={setCardNumber}
          id="cardNumber"
        />
        <Input
          label="Card Holder"
          value={cardHolder}
          onChange={setCardHolder}
          id="cardHolder"
        />
        <div className="flex gap-4">
          <Input
            label="Expiry Date"
            value={expiryDate}
            onChange={setExpiryDate}
            id="expiryDate"
            type="text"
          />
          <Input
            label="CVV"
            value={cvv}
            onChange={setCvv}
            id="cvv"
            type="password"
          />
        </div>
        <button className="bg-app-lightbrown text-text py-3 px-6 rounded-md mt-4 shadow-md w-full hover:bg-app-orange">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreditCardForm;
