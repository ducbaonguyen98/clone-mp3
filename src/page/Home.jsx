import React from "react";
import MetaTags from "react-meta-tags";

import { CardSection } from "../components/HomePage";
import Loading from "../components/Loading";
import { useTop100 } from "../hooks/api";

function Home() {
  const { data } = useTop100();

  if (!data) return <Loading />;

  return (
    <>
      <MetaTags>
        <title>Hello - guys !</title>
        <meta name="description" content="clone mp3" />
        <meta property="og:title" content="Hello - guys !" /> 
      </MetaTags>
      <div className="p-5 space-y-10">
        <div className="space-y-5">
          {data.data.map((item, index) => (
            <CardSection
              key={index.toString()}
              title={item.genre.name}
              data={item.items}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
