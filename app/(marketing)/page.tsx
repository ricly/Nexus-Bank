import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ClientLogos } from "./_components/client-logos";
import { Features } from "./_components/features";
import { Statistics } from "./_components/statistics";
import { Testimonials } from "./_components/testimonials";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-zinc-950 text-white">
        <section className="container mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Banking Without Boundaries
            </h1>
            <p className="text-zinc-300 mb-8 max-w-xl">
              Experience secure, streamlined banking with our state-of-the-art
              digital platform. Your money, your control, anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-emerald-400 text-zinc-950 hover:bg-emerald-500 h-12 px-6">
                Open an Account
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 h-12 px-6 text-black"
              >
                Explore Features
              </Button>
            </div>
          </div>
          <div className="relative aspect-video">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg"></div>
            <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl"></div>
            <div className="relative bg-zinc-900 rounded-lg p-4 shadow-xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
              <Image
                // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-trustpair-2025-02-28-12_44_23_page-0001.jpg-EuHWjMRTqZY6S3s3SinFVPlmV5EK59.jpeg"
                src={"/images/showcase.png"}
                width={500}
                height={300}
                alt="Banking dashboard preview"
                className="rounded-sm w-full"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-12">
            <ClientLogos />
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl">
              <span className="text-2xl font-bold">2M+</span> satisfied
              customers. <span className="text-emerald-400">100% secure.</span>
            </p>
          </div>
        </section>
      </div>

      <section className="py-16 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-2xl font-semibold mb-6 md:mb-0">
              1M+ customers.{" "}
              <span className="text-lime-400">98% satisfaction.</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-16">
              {[
                ["Visa", "/images/visa.png"],
                ["Mastercard", "/images/mastercard.png"],
                ["PayPal", "/images/paypal.png"],
                ["ApplePay", "/images/apple-pay.png"],
              ].map((company, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image
                    src={company[1]}
                    alt={company[0]}
                    width={75}
                    height={50}
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/bankpro_1.PNG"
                // src="/placeholder.svg?height=500&width=600"
                width={600}
                height={500}
                alt="Global banking network"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Global Banking, <br />
                Personalized For You
              </h2>
              <p className="text-zinc-700 mb-8">
                Access our secure and up-to-date banking services anywhere in
                the world. Our global network ensures your finances are always
                within reach, whether you&apos;re at home or traveling abroad.
              </p>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why SecureBank is different
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Our innovative approach to digital banking combines security,
              convenience, and personalized service in one seamless platform.
            </p>
          </div>

          <Statistics />
        </div>
      </section>

      <section className="py-24 bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Features Built For Modern Life
            </h2>
          </div>

          <Features />

          <div className="mt-12 text-center">
            <Button className="bg-emerald-400 text-zinc-950 hover:bg-emerald-500">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already made the
              switch to SecureBank.
            </p>
          </div>

          <Testimonials />
        </div>
      </section>
    </div>
  );
}
