import React from "react";
import Header from "../components/Header";
import CardSection from "../components/HomePage/CardSection";
import { useTop100 } from "../hooks/api";

function Home() {
  const { data } = useTop100();

  if (!data) return <>loading...</>;

  console.log(data);

  return (
    <div className="max-w-md m-auto p-3 space-y-10">
      <Header />
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
  );
}

export default Home;
