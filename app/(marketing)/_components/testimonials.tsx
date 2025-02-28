import { Star } from "lucide-react";
import Image from "next/image";

const testimonialsNew = [
  {
    quote:
      "NexusBank has completely transformed how I manage my finances. Their mobile app is intuitive and their customer service is exceptional.",
    author: "Sarah Johnson",
    title: "Small Business Owner",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "The security features at NexusBank give me peace of mind. I can monitor all my accounts in real-time and receive instant notifications for any activity.",
    author: "Michael Chen",
    title: "Technology Consultant",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote:
      "As a frequent traveler, NexusBank's global access and zero foreign transaction fees have saved me thousands. Their customer support is available 24/7.",
    author: "Emily Rodriguez",
    title: "International Sales Director",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
  },
];

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      content:
        "SecureBank has transformed how I manage my business finances. The mobile app is intuitive, and their business support team is always there when I need them.",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      content:
        "The security features at SecureBank give me peace of mind. Real-time notifications and instant card controls have saved me from fraudulent charges multiple times.",
    },
    {
      name: "Elena Rodriguez",
      role: "Frequent Traveler",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      content:
        "I travel internationally for work, and SecureBank's global access with no foreign transaction fees has saved me thousands. Their 24/7 support is unmatched.",
    },
  ];

  return (
    <>
      <div className="bg-black text-white py-20 px-6 md:px-12 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Voices of <span className="font-semibold">Trust</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Hear from our customers who have experienced the NexusBank
              difference in their financial journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsNew.map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-zinc-800"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-[#4ade80]"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-[#4ade80]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Join over 500,000 satisfied customers worldwide
            </p>
            <button className="px-6 py-3 rounded-full bg-[#4ade80] text-black hover:bg-[#22c55e] transition-colors">
              Open Your Account Today
            </button>
          </div>
        </div>
      </div>

      <div className="hidden gri md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-zinc-700 mb-6">{testimonial.content}</p>
            <div className="flex items-center gap-4">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-zinc-500">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
