import { mainPagePolicyConfig } from "@/config/main/pages";

const MainPolicyPage = () => {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {mainPagePolicyConfig.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {mainPagePolicyConfig.description}
        </p>

        {mainPagePolicyConfig.paragraphs.map((item, i) => (
          <div key={i} className="mt-8">
            <h2 className="text-xl font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPolicyPage;
