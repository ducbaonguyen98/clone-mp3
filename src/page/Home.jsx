import React from 'react';
import Header from '../components/Header';
import Card from '../components/HomePage/Card';

function Home() {
  return (
    <div className="max-w-md m-auto p-3 space-y-10">
      <Header />
      <div>
        <h2>Recent Plays</h2>
        <div className="flex gap-5 overflow-x-auto py-3">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </div>
  )
}

export default Home