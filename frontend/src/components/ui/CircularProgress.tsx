import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CombinedCircularProgressProps {
  pendingPercentage: number;
  inProgressPercentage: number;
  completedPercentage: number;
}

const CombinedCircularProgress: React.FC<CombinedCircularProgressProps> = ({
  pendingPercentage,
  inProgressPercentage,
  completedPercentage,
}) => {
  const totalPercentage =
    inProgressPercentage + completedPercentage + pendingPercentage;
  const inProgressRatio = (inProgressPercentage / totalPercentage) * 100;
  const completedRatio = (completedPercentage / totalPercentage) * 100;
  return (
    <div style={{ width: 200, height: 200, margin: "10px" }}>
      <CircularProgressbarWithChildren
        value={completedRatio}
        styles={buildStyles({
          pathColor: "#10b981",
          trailColor: "#eee",
          strokeLinecap: "butt",
          textSize: "10px",
        })}
        text={`${completedRatio.toFixed(0)}% compeleted`}
      >
        <CircularProgressbar
          value={inProgressRatio}
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
