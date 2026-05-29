import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center max-w-7xl">

        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="VRA Logo"
            width={420}
            height={420}
            className="object-contain opacity-95 w-[220px] md:w-[420px]"
            priority
          />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-[140px] font-bold leading-[0.9] tracking-tight text-center">
          Luxury
          <br />
          Authentication
          <br />
          Infrastructure
        </h1>

      </div>
    </main>
  );
}