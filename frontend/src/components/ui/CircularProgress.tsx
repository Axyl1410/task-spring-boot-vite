import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CombinedCircularProgressProps {
  inProgressPercentage: number;
  completedPercentage: number;
}

const CombinedCircularProgress: React.FC<CombinedCircularProgressProps> = ({
  inProgressPercentage,
  completedPercentage,
}) => {
  return (
    <div style={{ width: 200, height: 200, margin: "10px" }}>
      <CircularProgressbarWithChildren
        value={completedPercentage < 10 ? completedPercentage * 10 : 100}
        styles={buildStyles({
          pathColor: "#10b981",
          trailColor: "#eee",
          strokeLinecap: "butt",
          textSize: "10px",
        })}
        text={`${completedPercentage < 10 ? completedPercentage * 10 : 100}% compeleted`}
      >
        <CircularProgressbar
          value={inProgressPercentage < 10 ? inProgressPercentage * 10 : 100}
          styles={buildStyles({
            trailColor: "transparent",
            strokeLinecap: "butt",
            pathColor: "#0ea5e9",
          })}
        />
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CombinedCircularProgress;
