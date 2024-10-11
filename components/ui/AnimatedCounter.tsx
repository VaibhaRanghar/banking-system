"use client";
import React from "react";
import CountUp from "react-countup";

function AnimatedCounter({ amount }: { amount: number }) {
  return (
    <div className="w-full" >
      <CountUp end={amount} decimals={2} prefix="$" decimal="." />
    </div>
  );
}

export default AnimatedCounter;
