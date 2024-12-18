'use client'
import Image from 'next/image';
import happyGif from '../../public/happy.gif'
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-4 mt-14 text-pink-600">
      <h1 className="font-mono text-4xl">
        Olá!
      </h1>
      <div className='flex flex-col items-center justify-center mt-2 gap-3'>
        <p className="text-white">
          Aqui você vai encontrar uma série de perguntas que eu mesma vou analisar. Mas não se preocupe! Se você chegou até aqui, é porque já tem potencial para um encontro comigo. Yay! Que felicidade.
        </p>
        <Image src={happyGif} alt='garota comemorando' className='size-fit' />

        <Link href="/form-page">
          <Button variant="ghost" className='flex items-center text-xl mt-4'>
            Vamos começar?! <ArrowUpRight className='size-12' />
          </Button>
        </Link>
      </div>
    </div>
  );
}
