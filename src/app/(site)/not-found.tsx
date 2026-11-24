import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-28 text-center">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="container">
        <p className="font-display text-[8rem] font-extrabold leading-none text-gradient sm:text-[12rem]">404</p>
        <p className="mt-2 font-hand text-3xl text-sun-400">Oops! This page doesn&apos;t add up.</p>
        <p className="mx-auto mt-4 max-w-md text-slate-400">The page you were looking for has moved or doesn&apos;t exist.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/o-level-maths-tutor" variant="ghost">O-Level Maths</ButtonLink>
        </div>
      </div>
    </section>
  );
}
