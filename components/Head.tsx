import NextHead from "next/head";

type Props = {};

const Head = (props: Props) => {
  return (
    <NextHead>
      <title>Kanban - Task-management app | Ayanori Toyoda</title>
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
      <meta
        name="title"
        content="Kanban - Task-management app | Ayanori Toyoda"
      />
      <meta
        name="description"
        content="Full-stack task-management app built using Next.js, Redux Toolkit and Material UI for the frontend, and NestJS, PostgreSQL with Prisma for the backend."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kanban-delta.vercel.app/" />
      <meta
        property="og:title"
        content="Kanban - Task-management app | Ayanori Toyoda"
      />
      <meta
        property="og:description"
        content="Full-stack task-management app built using Next.js, Redux Toolkit and Material UI for the frontend, and NestJS, PostgreSQL with Prisma for the backend."
      />
      <meta
        property="og:image"
        content="https://i.postimg.cc/WpMq1czz/pika-1666843091558-1x.jpg"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://kanban-delta.vercel.app/" />
      <meta
        property="twitter:title"
        content="Kanban - Task-management app | Ayanori Toyoda"
      />
      <meta
        property="twitter:description"
        content="Full-stack task-management app built using Next.js, Redux Toolkit and Material UI for the frontend, and NestJS, PostgreSQL with Prisma for the backend."
      />
      <meta
        property="twitter:image"
        content="https://i.postimg.cc/WpMq1czz/pika-1666843091558-1x.jpg"
      />
    </NextHead>
  );
};

export default Head;
