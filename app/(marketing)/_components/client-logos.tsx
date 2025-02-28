import Image from "next/image";

export function ClientLogos() {
  const logos = [
    { name: "Company B", logo: "/images/ey.png?height=50&width=120" },
    { name: "Company C", logo: "/images/scf.png?height=50&width=120" },
    { name: "Company A", logo: "/images/logo.png?height=30&width=120" },
    { name: "Company D", logo: "/images/ubs.png?height=30&width=120" },
    { name: "Company B", logo: "/images/ey.png?height=50&width=120" },
  ];

  return (
    <>
      {logos.map((logo, index) => (
        <div
          key={index}
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <Image
            src={logo.logo || "/images/logo.png"}
            alt={logo.name}
            width={150}
            height={50}
            className="h-10 w-auto"
          />
        </div>
      ))}
    </>
  );
}
