'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AddPaymentCardData,
  addPaymentCardSchema,
} from '@/lib/validations/payment';

const getCardColor = (cardName: string) => {
  const name = cardName.toLowerCase();
  if (name.includes('visa')) return 'from-blue-600 to-blue-800';
  if (name.includes('mastercard')) return 'from-red-600 to-orange-600';
  if (name.includes('amex') || name.includes('american express'))
    return 'from-green-600 to-green-800';
  if (name.includes('discover')) return 'from-orange-400 to-orange-600';
  return 'from-gray-700 to-gray-900'; // Default color
};

export const detectCardType = (number: string) => {
  const cleanNumber = number.replace(/\s+/g, '');

  if (/^4/.test(cleanNumber)) return 'Visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'American Express';
  if (/^6(?:011|5)/.test(cleanNumber)) return 'Discover';

  return 'Credit Card'; // Default name
};

interface AddPaymentCardProps {
  onAddCard: (card: AddPaymentCardData) => void;
  onCancel: () => void;
}

export default function AddPaymentCard({
  onAddCard,
  onCancel,
}: AddPaymentCardProps) {
  const [previewName, setPreviewName] = useState('Credit Card');
  const [previewNumber, setPreviewNumber] = useState('••••');
  const [previewMonth, setPreviewMonth] = useState('MM');
  const [previewYear, setPreviewYear] = useState('YY');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });

  const form = useForm<AddPaymentCardData>({
    resolver: zodResolver(addPaymentCardSchema),
    defaultValues: {
      name: '',
      number: '',
      expiration_month: '',
      expiration_year: '',
      cvv: '',
    },
  });

  const watchedValues = form.watch();

  const updatePreview = useCallback(() => {
    const cardNumber = watchedValues.number;
    const detectedCardType = cardNumber
      ? detectCardType(cardNumber)
      : 'Credit Card';

    setPreviewName(watchedValues.name || detectedCardType);
    setPreviewNumber(cardNumber ? cardNumber.slice(-4) : '••••');
    setPreviewMonth(watchedValues.expiration_month || 'MM');
    setPreviewYear(
      watchedValues.expiration_year
        ? watchedValues.expiration_year.slice(-2)
        : 'YY'
    );
  }, [watchedValues]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview, watchedValues]);

  const onSubmit = async (data: AddPaymentCardData) => {
    try {
      setIsSubmitting(true);
      onAddCard(data);
      form.reset();
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Preview Card */}
          <div
            className={`bg-gradient-to-r ${getCardColor(detectCardType(form.getValues().number))} rounded-lg p-4 text-white shadow-md relative mb-6`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-xs uppercase opacity-80">Card</span>
                <span className="font-medium">{previewName}</span>
              </div>
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="mb-6">
              <div className="text-lg font-mono tracking-wider">
                •••• •••• •••• {previewNumber}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs uppercase opacity-80">Expires</span>
                <div className="font-medium">
                  {previewMonth}/{previewYear}
                </div>
              </div>
            </div>
          </div>

          {/* Card Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Card</CardTitle>
              <CardDescription>Enter your card details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name on card"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          updatePreview();
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          e.target.value = formatted;
                          field.onChange(e);
                          updatePreview();
                        }}
                        maxLength={19}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiration_month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          updatePreview();
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem
                              key={month.value}
                              value={month.value}
                            >
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiration_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          updatePreview();
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem
                              key={year.value}
                              value={year.value}
                            >
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="space-x-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Add Card'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
