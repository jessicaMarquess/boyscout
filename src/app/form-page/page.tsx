import React from 'react'
import funnyGif from '../../../public/funnyloading.gif'
import Image from 'next/image'

function Form() {
  return (
    <div className='w-full flex flex-col items-center mt-4 p-4'>
      <h1 className='text-pink-100 font-mono'>Estamos andando o mais rápido o possível na construção dessa página, não se preocupe!</h1>
      <Image src={funnyGif} alt='imagem de um caracol e embaixo um carregamento' className='size-fit' loading='lazy' />
    </div>
  )
}

export default Form
