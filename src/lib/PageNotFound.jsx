import ActionLink from "@/components/ActionLink";

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-heading text-7xl font-bold tracking-[-0.03em] text-foreground md:text-8xl">
          404
        </p>
        <h2 className="mt-6 font-heading text-xl font-bold text-foreground md:text-2xl">
          Página no encontrada · Page not found
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          La dirección que buscas no existe o ha cambiado. · The address you are
          looking for does not exist or has changed.
        </p>
        <ActionLink to="/" className="mt-8">
          Nafureanu — inicio / home
        </ActionLink>
      </div>
    </div>
  );
}