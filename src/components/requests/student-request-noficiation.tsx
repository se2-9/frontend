'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface StudentNotificationProps {
  studentID: string;
  setReqCount: Dispatch<SetStateAction<number>>;
}

const StudentRequestNotification = ({
  studentID,
  setReqCount,
}: StudentNotificationProps) => {
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current) {
      console.log('🚨 WebSocket already connected, skipping...');
      return;
    }

    const ws = new WebSocket(`ws://localhost:8080/ws/student/${studentID}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket Message:', event.data);
      toast.info(event.data, {
        closeButton: true,
        action: {
          label: 'View',
          onClick: () => router.push('/student/requests'),
        },
      });
      setReqCount((prev) => prev + 1);
    };

    ws.onclose = (event) => {
      console.log(`❌ WebSocket closed (${event.code}): ${event.reason}`);
      wsRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, 'Manual close');
        wsRef.current = null;
      }
    };
  }, [studentID, setReqCount, router]);

  return <></>;
};

export default StudentRequestNotification;
