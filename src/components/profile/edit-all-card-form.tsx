import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CardDTO } from '@/dtos/card';
import { Icons } from '../icons';
import MaxWidthWrapper from '../max-width-wrapper';
import { PlusIcon, CreditCardIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog';
import {
  addPaymentCard,
  deletePaymentCard,
  getUserCards,
} from '@/lib/api/payment';
import AddPaymentCard, { detectCardType } from '../payment/add-payment-card';
import {
  AddPaymentCardData,
  DeletePaymentCardData,
} from '@/lib/validations/payment';
import { toast } from 'sonner';

export default function EditAllCardForm() {
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);

  const {
    data: cards,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get'],
    queryFn: async () => {
      const p = await getUserCards();
      return p?.result ?? [];
    },
    enabled: true,
  });

  const { mutate: addCard } = useMutation({
    mutationFn: addPaymentCard,
    onSuccess: () => {
      toast.success('Card added successfully');
      setShowAddCardDialog(false);
      refetch();
    },
  });
  const { mutate: deleteCard } = useMutation({
    mutationFn: deletePaymentCard,
    onSuccess: () => {
      toast.success('Card deleted successfully');
      refetch();
    },
  });

  const handleAddCard = async (newCard: AddPaymentCardData) => {
    try {
      addCard(newCard);
    } catch (e) {
      console.error(e);
    }
  };
  const handleDeleteCard = async (cardNumber: string) => {
    try {
      const payload: DeletePaymentCardData = { card_number: cardNumber };
      deleteCard(payload);
    } catch (e) {
      console.error(e);
    }
  };
  const getCardIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'visa':
        return <Icons.visa className="h-8 w-8" />;
      case 'mastercard':
        return <Icons.mastercard className="h-8 w-8" />;
      case 'amex':
        return <CreditCardIcon className="h-8 w-8" />;
      default:
        return null;
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

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="h-[calc(100vh-80px)] grid place-items-center">
          <Icons.logo className="animate-spin" />
        </div>
      </MaxWidthWrapper>
    );
  }

  const allCards = cards ?? [];
  const hasCards = allCards.length > 0;

  return (
    <MaxWidthWrapper className="py-8">
      <div className="flex flex-col items-center">
        <div
          className={`w-full ${hasCards ? 'mb-8' : 'h-[calc(100vh-160px)] flex flex-col justify-center'}`}
        >
          <Dialog
            open={showAddCardDialog}
            onOpenChange={setShowAddCardDialog}
          >
            <DialogTrigger asChild>
              {hasCards ? (
                <div className="flex justify-center">
                  <Button className="bg-app-lightbrown text-lightbrown-foreground hover:text-white">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Card
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CreditCardIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    No cards yet
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Add your first card to get started!
                  </p>
                  <Button className="bg-app-lightbrown text-lightbrown-foreground">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Card
                  </Button>
                </div>
              )}
            </DialogTrigger>
            <DialogContent
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              aria-description="Add your card"
            >
              <div className="w-full max-w-lg bg-app-lightbrown p-6 rounded-lg shadow-lg">
                <DialogTitle>Add Your Card</DialogTitle>
                <div className="grid gap-4 py-4">
                  <AddPaymentCard
                    onAddCard={(card) => {
                      handleAddCard(card);
                      setShowAddCardDialog(false);
                    }}
                    onCancel={() => setShowAddCardDialog(false)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {hasCards && (
          <div className="w-full space-y-6">
            {allCards.map((card: CardDTO) => (
              <label
                key={card.id}
                className="relative flex cursor-pointer rounded-lg border p-1 m-1 items-center space-x-2"
              >
                <div className="w-full">
                  <div
                    className={`bg-gradient-to-r ${getCardColor(detectCardType(card.number))} rounded-lg p-4 text-white shadow-md relative`}
                  >
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
                        •••• •••• •••• {card.number.slice(-4)}
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
                    </div>
                  </div>
                </div>
                <Button
                  className="bg-app-lightbrown text-lightbrown-foreground hover:bg-red-400"
                  onClick={() => {
                    handleDeleteCard(card.number);
                  }}
                >
                  <TrashIcon className="h-3 w-3" />
                </Button>
              </label>
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
