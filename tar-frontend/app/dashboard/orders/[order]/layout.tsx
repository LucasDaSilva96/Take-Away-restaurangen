import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { order: string };
}): Promise<Metadata> {
  console.log("Received order:", params.order); // For debugging

  return {
    title: `Order #${params.order} | TAR`,
  };
}

type Props = {
  children: React.ReactNode;
};

// Main layout component
export default function Layout({ children }: Props) {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      {children}
    </section>
  );
}
