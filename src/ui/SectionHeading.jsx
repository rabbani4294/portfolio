export default function SectionHeading({ title, lead, align = "left" }) {
  const center = align === "center";
  return (
    <header className={`mb-14 md:mb-20 ${center ? "mx-auto text-center" : ""} max-w-4xl`} style={{ perspective: 900 }}>
      <h2
        data-heading
        className="font-display text-[clamp(1.6rem,3.7vw,2.8rem)] font-semibold leading-[1.08] tracking-tight text-ice"
      >
        {title}
      </h2>
      <span
        data-underline
        className={`mt-6 block h-[3px] w-24 rounded-full bg-gradient-to-r from-electric to-cyan ${center ? "mx-auto origin-center" : "origin-left"}`}
      />
      {lead && (
        <p data-reveal className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
          {lead}
        </p>
      )}
    </header>
  );
}
