import Image from 'next/image'
import coffeeImage from '../public/images/coffee.png'

export default function Hero() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-12 mt-6">
      <div className=" col-span-7 w-full place-self-center text-center sm:text-left justify-self-start">
        <h1 className="text-2xl sm:text-4xl md:text-6xl">
          Join a community of curious minds.
        </h1>
        <p className="py-6">
          Discover stories and ideas from people with first-hand experience.
        </p>
      </div>
      <div className="col-span-5">
        <Image src={coffeeImage} width={400} height={400} alt="coffee" />
      </div>
    </section>
  )
}
