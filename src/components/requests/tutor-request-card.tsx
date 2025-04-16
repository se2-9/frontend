import { BookIcon } from 'lucide-react';
import { RequestDTO } from '@/dtos/request';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { ConfirmDialog } from '../confirm-dialog';
import { useState } from 'react';
import { Button } from '../ui/button';

interface TutorRequestCardProps {
  request: RequestDTO;
}

export default function TutorRequestCard({ request }: TutorRequestCardProps) {
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false);

  return (
    <>
      <Card className="w-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookIcon className="w-6 h-6" />
            <h2 className="text-xl font-semibold">
              Request from {request.student_id}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge>{request.status}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <p>
              Created at: {new Date(request.created_at).toLocaleDateString()}
            </p>
          </div>
          <ConfirmDialog
            title="Cancel Request"
            description="Are you sure you want to cancel this request? This action cannot be undone."
            isOpen={isConfirmCancelOpen}
            onClose={() => setIsConfirmCancelOpen(false)}
            onConfirm={() => {
              toast('Request accepted!');
              setIsConfirmCancelOpen(true);
            }}
          />
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            onClick={() => setIsConfirmCancelOpen(true)}
            className="bg-destructive/70 hover:bg-destructive"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
      <ConfirmDialog
        title="Cancel Request"
        description="Are you sure you want to cancel this request? This action cannot be undone."
        isOpen={isConfirmCancelOpen}
        onClose={() => setIsConfirmCancelOpen(false)}
        onConfirm={() => {
          toast('Request is canceled!');
          setIsConfirmCancelOpen(true);
        }}
      />
    </>
  );
}
