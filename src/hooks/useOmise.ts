import { loadScript } from '@/lib/utils';
import Omise from '@/types/omise/omise';
import { useEffect, useState } from 'react';

export function useOmise() {
  const [omise, setOmise] = useState<Omise>();

  useEffect(() => {
    loadScript('https://cdn.omise.co/omise.js').then(() => {
      setOmise(window.Omise);
      window.Omise.setPublicKey('pkey_test_635k9a501kjvh6lac06');
    });
  }, []);

  return { omise };
}
