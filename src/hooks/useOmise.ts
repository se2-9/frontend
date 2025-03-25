import { loadScript } from '@/lib/utils';
import Omise from '@/types/omise/omise';
import { useEffect, useState } from 'react';

export function useOmise() {
  const [omise, setOmise] = useState<Omise>();

  useEffect(() => {
    loadScript('https://cdn.omise.co/omise.js').then(() => {
      setOmise(window.Omise);
      window.Omise.setPublicKey('pkey_test_600efhihjwg96138vv6');
    });
  }, []);

  return { omise };
}
