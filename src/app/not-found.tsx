import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[#0a0a23]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #4a90e222 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #9b59b622 0%, transparent 50%), #0a0a23",
        }}
      />

      <div className="relative z-10 max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
          <Rocket className="size-8 text-cyan-400" aria-hidden="true" />
        </div>

        <p className="font-mono text-sm text-cyan-400/80">$ curl /this-page</p>
        <h1 className="mt-2 font-heading text-6xl font-bold text-foreground">
          404
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Lost in deep space. This route doesn&apos;t exist.
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Error: sector not found · try <span className="text-cyan-400">goto home</span>
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/" />}
          size="lg"
          className="mt-8 bg-cyan-500 font-semibold text-navy-950 hover:bg-cyan-400"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}