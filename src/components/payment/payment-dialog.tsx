'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { Loader2, Grid, List, CreditCardIcon, CheckIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { addPaymentCard, payWithCard } from '@/lib/api/payment';
import { useOmise } from '@/hooks/useOmise';
import { useMutation } from '@tanstack/react-query';
import { CardDTO } from '@/dtos/card';
import { AddPaymentCardData } from '@/lib/validations/payment';
import AddPaymentCard, { detectCardType } from './add-payment-card';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  savedCards: CardDTO[];
  refetchRequests: () => void;
  refetchCard: () => void;
}

export function PaymentDialog({
  isOpen,
  onClose,
  requestId,
  savedCards,
  refetchRequests,
  refetchCard,
}: PaymentDialogProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    savedCards[0]?.id || ''
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { omise } = useOmise();

  const { mutate: addCard } = useMutation({
    mutationFn: addPaymentCard,
    onSuccess: () => {
      toast.success('Card added successfully');
      setShowAddCardDialog(false);
      refetchCard();
    },
    onError: () => {
      toast.error('Unable to add card');
    },
  });

  const { mutate: pay } = useMutation({
    mutationFn: payWithCard,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Payment successful!');
      setIsProcessing(false);
      onClose();
      refetchRequests();
      //end of suiing
      // const chargeId = data.result.charge_id;
      // const evtSource = new EventSource(
      //   `${process.env.NEXT_PUBLIC_API_URL || 'https://api.findmytutor.macgeargear.dev/api/v1'}/payment/sse/${chargeId}`
      // );

      // evtSource.onmessage = (e) => {
      //   console.log({ event: e });
      // };

      // evtSource.addEventListener('charge.create', (e) => {
      //   console.log('create');
      //   console.log({ event: e });
      //   toast.success('Payment successful!');
      //   // evtSource.close();
      //   setIsProcessing(false);
      //   onClose();
      //   refetchRequests();
      // });

      // evtSource.addEventListener('charge.failed', (e) => {
      //   console.log('failed');
      //   console.log({ event: e });
      //   evtSource.close();
      //   setIsProcessing(false);
      //   onClose();
      //   refetchRequests();
      // });

      // evtSource.onerror = (e) => {
      //   console.log('error');
      //   console.log({ event: e });
      //   evtSource.close();
      //   setIsProcessing(false);
      //   onClose();
      //   refetchRequests();
      // };
    },
    onError: (error) => {
      toast.error(error.message);
      setIsProcessing(false);
    },
  });

  const handleAddCard = async (newCard: AddPaymentCardData) => {
    try {
      addCard(newCard);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirmPay = async () => {
    console.log(selectedCardId);
    if (!selectedCardId) {
      return toast.error('Please select a card');
    }

    const selectedCard = savedCards.find((card) => card.id === selectedCardId);
    if (!selectedCard) {
      return toast.error('Selected card not found');
    }

    const omisePublicKey = 'pkey_test_63hg8hy9cna4r4r2vqt';
    if (!omisePublicKey) {
      toast.error('Payment service is not configured properly.');
      return;
    }
    setIsProcessing(true);
    window.Omise.setPublicKey(omisePublicKey);
    omise?.createToken(
      'card',
      {
        name: selectedCard.name,
        expiration_month: Number(selectedCard.expiration_month),
        expiration_year: Number(selectedCard.expiration_year),
        number: selectedCard.number,
        security_code: '123',
      },
      async (_, response) => {
        console.log('omise create token response: ', response);
        if (response.object === 'error') {
          toast.error(response.message);
          setIsProcessing(false);
          return;
        }

        pay({
          request_id: requestId,
          amount: 20 * 100,
          card_token: response.id,
        });
      }
    );
  };

  const getCardIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'visa':
        return <Icons.visa className="h-8 w-8" />;
      case 'mastercard':
        return <Icons.mastercard className="h-8 w-8" />;
      case 'amex':
        return <CreditCardIcon className="h-8 w-8" />;
    }
  };

  const getCardColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'visa':
        return 'from-blue-500 to-blue-600';
      case 'mastercard':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const isDefaultCard = (index: number) => {
    return index === 0;
  };

  return (
    <>
      {!showAddCardDialog ? (
        <Dialog
          open={isOpen}
          onOpenChange={onClose}
        >
          <DialogContent className="h-full z-50">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Select Payment Method
              </DialogTitle>
              <DialogDescription>
                Choose a card to complete your payment
              </DialogDescription>
            </DialogHeader>

            {savedCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CreditCardIcon className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No saved cards found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowAddCardDialog(true)}
                >
                  Add New Card
                </Button>
              </div>
            ) : (
              // Show card selection
              <>
                <div className="flex justify-between mb-2 h-fit">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddCardDialog(true)}
                  >
                    + Add New Card
                  </Button>
                  <div className="flex items-center space-x-1 border rounded-md w-fit h-fit">
                    <Toggle
                      pressed={viewMode === 'list'}
                      onPressedChange={() => setViewMode('list')}
                      aria-label="List view"
                      className="data-[state=on]:bg-muted"
                    >
                      <List className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                      pressed={viewMode === 'grid'}
                      onPressedChange={() => setViewMode('grid')}
                      aria-label="Grid view"
                      className="data-[state=on]:bg-muted"
                    >
                      <Grid className="h-4 w-4" />
                    </Toggle>
                  </div>
                </div>
                <RadioGroup
                  value={selectedCardId}
                  onValueChange={setSelectedCardId}
                  className={cn(
                    'gap-4 overflow-y-auto max-h-[300px]',
                    viewMode === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'
                  )}
                >
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
                          className={`bg-gradient-to-r ${getCardColor(detectCardType(card.number))} rounded-lg p-4 text-white shadow-md relative`}
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
                            {getCardIcon(detectCardType(card.number))}
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
                </RadioGroup>
              </>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <Button
                type="button"
                onClick={handleConfirmPay}
                disabled={
                  !selectedCardId || isProcessing || savedCards.length === 0
                }
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Payment'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsProcessing(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={showAddCardDialog}
          onOpenChange={setShowAddCardDialog}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add a New Card</DialogTitle>
            </DialogHeader>
            <AddPaymentCard
              onAddCard={(card) => {
                handleAddCard(card);
                setShowAddCardDialog(false);
              }}
              onCancel={() => setShowAddCardDialog(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
