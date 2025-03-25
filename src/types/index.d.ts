import Omise from '@/types/omise/omise';
import OmiseCard from '@/types/omise/omiseCard';

declare global {
  // Omise types
  interface Window {
    Omise: Omise;
    OmiseCard: OmiseCard;
  }
}
