
export default function DashLayout
({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main
            className={`bg-main-light`}
        >
        {children}

        </main>

    );
}
