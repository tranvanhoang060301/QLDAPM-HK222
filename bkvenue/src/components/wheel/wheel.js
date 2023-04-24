import React, { useState } from "react";
import WheelComponent from "react-wheel-of-prizes";
import "./base.css";

const Wheel = ({optionList, idList, onFinished: onFinishedCall}) => {
  const [optionLists, setOptionLists] = useState(optionList);
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F", "#F9AA1F", "#EC3F3F", "#FF9000"];
  const onFinished = (winner) => {
    const winnerIndex = optionLists.indexOf(winner);
    const winnerId = idList[winnerIndex][Object.keys(idList[winnerIndex])[0]];
    onFinishedCall(winnerId);
  };
  return (
    <>
      {optionLists ? (
        <WheelComponent
          segments={optionLists}
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
