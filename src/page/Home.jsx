import React from "react"; 
import CardSection from "../components/HomePage/CardSection";
import Loading from "../components/Loading";
import { useTop100 } from "../hooks/api";

function Home() { 
  const { data } = useTop100();
  
  if (!data) return <Loading />;

  return (
    <div className="space-y-10"> 
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
