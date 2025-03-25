'use client';

import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AddPaymentCard from './add-payment-card';

const getCardColor = (cardName: string) => {
  const name = cardName.toLowerCase();
  if (name.includes('visa')) return 'from-blue-600 to-blue-800';
  if (name.includes('mastercard')) return 'from-red-600 to-orange-600';
  if (name.includes('amex') || name.includes('american express'))
    return 'from-green-600 to-green-800';
  if (name.includes('discover')) return 'from-orange-400 to-orange-600';
  return 'from-gray-700 to-gray-900'; // Default color
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCardIcon = (cardName: string) => {
  return (
    <div className="h-6 w-10 bg-white bg-opacity-20 rounded-md flex items-center justify-center text-xs font-bold">
      CARD
    </div>
  );
};

interface PaymentCard {
  id: string;
  name: string;
  number: string;
  expiration_month: string;
  expiration_year: string;
  cvv: string;
  makeDefault?: boolean;
}

export default function PaymentCardList() {
  // Sample saved cards
  const [savedCards, setSavedCards] = useState<PaymentCard[]>([
    {
      id: 'card_1',
      name: 'Visa',
      number: '4242424242424242',
      expiration_month: '12',
      expiration_year: '2025',
      cvv: '123',
    },
    {
      id: 'card_2',
      name: 'Mastercard',
      number: '5555555555554444',
      expiration_month: '10',
      expiration_year: '2024',
      cvv: '321',
    },
  ]);

  const [selectedCardId, setSelectedCardId] = useState(savedCards[0]?.id || '');
  const [showAddCard, setShowAddCard] = useState(false);

  const isDefaultCard = (index: number) => {
    return savedCards[index]?.makeDefault === true;
  };

  // Handle adding a new card
  const handleAddCard = (newCard: PaymentCard) => {
    let updatedCards = [...savedCards];

    if (newCard.makeDefault) {
      updatedCards = updatedCards.map((card) => ({
        ...card,
        makeDefault: false,
      }));
    }

    setSavedCards([...updatedCards, newCard]);
    setSelectedCardId(newCard.id);
    setShowAddCard(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Select a payment method or add a new card
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showAddCard ? (
            <div className="space-y-4">
              <AddPaymentCard onAddCard={handleAddCard} />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowAddCard(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedCards.map((card, index) => (
                  <label
                    key={card.id}
                    className={`relative flex cursor-pointer rounded-lg border p-1 m-1 ${
                      selectedCardId === card.id
                        ? 'border-primary ring-2 ring-primary ring-opacity-50'
                        : 'border-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="card"
                      value={card.id}
                      className="sr-only"
                      checked={selectedCardId === card.id}
                      onChange={() => setSelectedCardId(card.id)}
                    />
                    <div className="w-full">
                      <div
                        className={`bg-gradient-to-r ${getCardColor(card.name)} rounded-lg p-4 text-white shadow-md relative`}
                      >
                        {isDefaultCard(index) && (
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 font-medium">
                            Default
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex flex-col">
                            <span className="text-xs uppercase opacity-80">
                              Card
                            </span>
                            <span className="font-medium">{card.name}</span>
                          </div>
                          {getCardIcon(card.name)}
                        </div>
                        <div className="mb-6">
                          <div className="text-lg font-mono tracking-wider">
                            •••• •••• •••• {card.number.toString().slice(-4)}
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-xs uppercase opacity-80">
                              Expires
                            </span>
                            <div className="font-medium">
                              {card.expiration_month
                                .toString()
                                .padStart(2, '0')}
                              /{card.expiration_year.toString().slice(-2)}
                            </div>
                          </div>
                          {selectedCardId === card.id && (
                            <div className="bg-white bg-opacity-20 rounded-full p-1">
                              <CheckIcon className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowAddCard(true)}
              >
                + Add New Card
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
