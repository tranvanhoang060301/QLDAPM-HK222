import React from "react";
import WheelComponent from "./WheelComponent";
import "./base.css";

const Wheel = ({active, optionList, onFinished: onFinishedCall}) => {
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F", "#F9AA1F", "#EC3F3F", "#FF9000"];
  const onFinished = (winner) => {
    if (active !== "whatever") {
      const winnerId = optionList.find((element) => element.name === winner).id;
      onFinishedCall(winnerId);
    }
    onFinishedCall(winner);
  };
  
  return (
    <>
      {optionList ? (
        <WheelComponent
          segments={optionList.map(item => item.name)}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={290}
          upDuration={100}
          downDuration={1000}
          fontFamily="Arial"
        />
      ) : (
        <h1>Hong ăn thì thôi bày đặt tìm đến tao!!!</h1>
      )}
    </>
  );
};

export default Wheel;
