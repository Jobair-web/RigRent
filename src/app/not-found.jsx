import Button from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="bg-gradient-to-r from-navy to-primary bg-clip-text font-heading text-8xl font-extrabold text-transparent dark:from-primary dark:to-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-muted">The page you are looking for was moved or never existed.</p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/equipment" variant="outline">Browse equipment</Button>
      </div>
    </div>
  );
}
