import React from "react";
import Header from "../components/Header";
import CardSection from "../components/HomePage/CardSection";
import { useTop100 } from "../hooks/api";

function Home() {
  console.log("HomePapge render")
  const { data } = useTop100();

  if (!data) return <>loading...</>;

  return (
    <div className="space-y-10">
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
