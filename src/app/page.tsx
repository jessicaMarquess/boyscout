'use client'
import Image from 'next/image';
import happyGif from '../../public/happy.gif'
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const route = useRouter()
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="max-w-5xl mx-auto p-4 mt-14 text-pink-600">
      <h1 className="font-mono text-4xl">
        Olá!
      </h1>
      <div className='flex flex-col items-center justify-center mt-2 gap-3'>
        <p className="text-white">
          Aqui você vai encontrar uma série de perguntas que eu mesma vou analisar. Mas não se preocupe! Se você chegou até aqui, é porque já tem potencial para um encontro comigo. Yay! Que felicidade.
        </p>
        <Image src={happyGif} alt='garota comemorando' className='size-fit' priority />
        <Button variant="link" className='flex items-center text-xl mt-4 text-pink-600' onClick={() => route.push('/form-page')}>
          Vamos começar?! <ArrowUpRight className='size-12' />
        </Button>
      </div>
    </div>
  );
}
