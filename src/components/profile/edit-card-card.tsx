'use client'
import { CardDTO } from "@/dtos/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { BookOpen, User, AtSignIcon, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { CardDetailsDialog } from "./card-detail-dialog";

interface EditCardCardProps {
  card:CardDTO;
}
export const EditCardCard =({
    card
}: EditCardCardProps)=> {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <>
      <Card className="w-full flex flex-col h-full rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white text-text p-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BookOpen
                  size={18}
                  className="text-primary"
                />
                {card.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm flex items-center gap-2">
                <User
                  size={14}
                  className="text-gray-500"
                />
                {card.name}
                <AtSignIcon size={14} />
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow space-y-1 mt-2">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-700">
            <div className="flex items-center gap-2">
            </div>
            <div className="flex items-center gap-1 font-medium">
              {card.name}
            </div>
          </div>

          <Separator className="my-2" />

          <p className="font-semibold">Expiration Month</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {card.expiration_month}
          </p>
          <p className="font-semibold">Expiration Year</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {card.expiration_year}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between pt-4 flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDetailsOpen(true)}
            className="flex items-center gap-2"
          >
            <Eye
              size={16}
              className="text-primary"
            />
            View Details
          </Button>
        </CardFooter>
      </Card>


      <CardDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        card={card}
      />

    </>
  );
}
