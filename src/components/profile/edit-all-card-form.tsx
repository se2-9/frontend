'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';


import { fetchCards } from '@/lib/api/profile';
import { CardDTO } from '@/dtos/card';
import { Icons } from '../icons';
import MaxWidthWrapper from '../max-width-wrapper';
import {EditCardCard} from './edit-card-card';
import { ScrollTextIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import CreatePost from '../posts/create-post';
import { DialogHeader } from '../ui/dialog';
import CreateCard from './create-card';
export default function EditAllCardForm() {
  const {
    data: cards,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get'],
    queryFn: async () => {
      const p = await fetchCards();
      return p?.result ?? [];
    },
    enabled: true,
  });
  const allCards = cards??[]
  // const [allCards, setAllCards] = useState<CardDTO[]>(cards ?? []);

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="h-[calc(100vh-80px)] grid place-items-center">
          <Icons.logo className="animate-spin" />
        </div>
      </MaxWidthWrapper>
    );

  }
  const hasCards = allCards.length > 0;
  return (
    <MaxWidthWrapper className="py-8">
          <div className="flex flex-col items-center">
            <div
              className={`w-full ${hasCards ? 'mb-8' : 'h-[calc(100vh-160px)] flex flex-col justify-center'}`}
            >
              <Dialog>
                <DialogTrigger asChild>
                  {hasCards ? (
                    <div className="flex justify-center">
                      <Button className="bg-app-lightbrown text-lightbrown-foreground hover:text-white">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create Card
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <ScrollTextIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h2 className="text-2xl font-semibold text-foreground">
                        No cards yet
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Create your first card to get started!
                      </p>
                      <Button className="bg-app-lightbrown text-lightbrown-foreground transition-colors">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create Card
                      </Button>
                    </div>
                  )}
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[425px]"
                  aria-description="Add you card"
                >
                  <DialogHeader>
                    <DialogTitle>Add Your Card</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <CreateCard refetch={refetch}/>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
    
            {hasCards && (
              <div className="w-full space-y-6">
                {allCards.map((card: CardDTO) => (
                  <EditCardCard
                    key={card.id}
                    card={card}
                  />
                ))}
                
              </div>
            )}
          </div>
      </MaxWidthWrapper>
  )
}
