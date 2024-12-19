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
    <div className="w-full px-4 lg:w-[1080px] lg:mx-auto flex flex-col justify-center items-center text-pink-600 gap-4">
      <div className='w-full mt-[5%]'>
        <h1 className="font-mono text-2xl lg:text-4xl mb-2">
          Iuuup, vejo que finalizou!
        </h1>
        <p className="text-white text-lg lg:text-2xl">
          Enquanto analiso, vai uma playlist aleatória?
        </p>
      </div>
      <iframe
        className="w-full rounded-3 h-[500px]"
        src="https://open.spotify.com/embed/playlist/6RH04MMkLFSC34ILFiIB6H?utm_source=generator"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      <div className='flex flex-col items-center justify-center mt-2 gap-3'>

        <Button variant="link" className='hidden lg:flex items-center text-xl mt-4 text-pink-600' onClick={() => route.push('/')}>
          Voltar ao início <ArrowUpRight className='size-12' />
        </Button>
      </div>
    </div>
  );
}
