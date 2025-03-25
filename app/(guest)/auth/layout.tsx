import "./auth.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-dvh bg-image relative">
      <div className="w-full mx-auto max-w-[90%] h-full backdrop-blur-sm bg-white/15 shadow-medium">
        {children}
      </div>
    </div>
  );
}
