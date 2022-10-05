import NextHead from "next/head";

type Props = {};

const Head = (props: Props) => {
  return (
    <NextHead>
      <title>Kanban</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
};

export default Head;