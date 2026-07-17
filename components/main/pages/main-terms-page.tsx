import { mainPageTermsConfig } from "@/config/main/pages";

const MainTermsPage = () => {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {mainPageTermsConfig.title}
        </h1>

        {mainPageTermsConfig.paragraphs.map((item, i) => (
          <p key={i} className="mt-6 text-base leading-7 text-muted-foreground">
            {item.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MainTermsPage;
