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
import { payWithCard } from '@/lib/api/payment';
import { useOmise } from '@/hooks/useOmise';
import { useMutation } from '@tanstack/react-query';

export interface Card {
  id: string;
  last4: string;
  brand: string;
  expiration_month: number;
  expiration_year: number;
}

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  savedCards: Card[];
  refetch: () => void;
}

export function PaymentDialog({
  isOpen,
  onClose,
  requestId,
  savedCards,
  refetch,
}: PaymentDialogProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    savedCards[0]?.id || ''
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { omise } = useOmise();

  const { mutate: pay } = useMutation({
    mutationFn: payWithCard,
    onSuccess: (data) => {
      const chargeId = data.result.charge_id;

      const evtSource = new EventSource(
        'http://localhost:8080/api/v1/payment/status/' + chargeId
      );

      evtSource.onmessage = (e) => {
        console.log({ event: e });
      };

      evtSource.addEventListener('charge.create', (e) => {
        console.log({ event: e });
        toast.success('Payment successful!');
        refetch();
        evtSource.close();
        setIsProcessing(false);
        onClose();
      });

      evtSource.addEventListener('charge.failed', (e) => {
        console.log({ event: e });
        evtSource.close();
        setIsProcessing(false);
        onClose();
      });
    },
    onError: (error) => {
      toast.error(error.message);
      setIsProcessing(false);
    },
  });

  const handleConfirm = async () => {
    if (!selectedCardId) return toast.error('Please select a card');
    setIsProcessing(true);

    omise?.createToken(
      'card',
      {
        name: 'macgeargear',
        expiration_month: savedCards[0].expiration_month,
        expiration_year: savedCards[0].expiration_year,
        number: '4242424242424242',
        security_code: '123',
      },
      async (_, response) => {
        if (response.object === 'error') {
          toast.error(response.message);
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

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return <Icons.visa className="h-8 w-8" />;
      case 'mastercard':
        return <Icons.mastercard className="h-8 w-8" />;
      case 'amex':
        return <CreditCardIcon className="h-8 w-8" />;
    }
  };

  const getCardColor = (brand: string) => {
    switch (brand.toLowerCase()) {
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="h-full z-50">
        <DialogHeader>
          <DialogTitle className="text-xl">Select Payment Method</DialogTitle>
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
            >
              Add New Card
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-2">
              <div className="flex items-center space-x-1 border rounded-md">
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
                'gap-4 overflow-y-scroll',
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
                      className={`bg-gradient-to-r ${getCardColor(card.brand)} rounded-lg p-4 text-white shadow-md relative`}
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
                          <span className="font-medium">{card.brand}</span>
                        </div>
                        {getCardIcon(card.brand)}
                      </div>
                      <div className="mb-6">
                        <div className="text-lg font-mono tracking-wider">
                          •••• •••• •••• {card.last4}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-xs uppercase opacity-80">
                            Expires
                          </span>
                          <div className="font-medium">
                            {card.expiration_month.toString().padStart(2, '0')}/
                            {card.expiration_year.toString().slice(-2)}
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
            onClick={handleConfirm}
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
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
