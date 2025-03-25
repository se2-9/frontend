'use client';

import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreditCard } from 'lucide-react';

interface CardDetails {
  name: string;
  number: string;
  expiration_month: string;
  expiration_year: string;
  cvv: string;
}

export default function PaymentCard() {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    name: 'baz',
    number: '424242424242424242',
    expiration_month: '12',
    expiration_year: '2030',
    cvv: '123',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof CardDetails, value: string) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCardNumber = (number: string) => {
    return number
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically send the updated card details to your backend
    setIsEditing(false);
  };

  // Generate array of months for the dropdown
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });

  // Generate array of years for the dropdown (current year + 20 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Payment Card</CardTitle>
            <CardDescription>Your saved card details</CardDescription>
          </div>
          <CreditCard className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          // Edit mode
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                value={cardDetails.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Card Number</Label>
              <Input
                id="number"
                value={cardDetails.number}
                onChange={(e) =>
                  handleChange('number', e.target.value.replace(/\s/g, ''))
                }
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Select
                  value={cardDetails.expiration_month}
                  onValueChange={(value) =>
                    handleChange('expiration_month', value)
                  }
                >
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select
                  value={cardDetails.expiration_year}
                  onValueChange={(value) =>
                    handleChange('expiration_year', value)
                  }
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={cardDetails.cvv}
                  onChange={(e) => handleChange('cvv', e.target.value)}
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
          </>
        ) : (
          // View mode
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Cardholder Name</p>
              <p className="font-medium">{cardDetails.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Card Number</p>
              <p className="font-medium">
                {formatCardNumber(cardDetails.number)}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Month</p>
                <p className="font-medium">{cardDetails.expiration_month}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{cardDetails.expiration_year}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">CVV</p>
                <p className="font-medium">•••</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {isEditing ? (
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={toggleEdit}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Card</Button>
          </div>
        ) : (
          <Button onClick={toggleEdit}>Edit Card</Button>
        )}
      </CardFooter>
    </Card>
  );
}
