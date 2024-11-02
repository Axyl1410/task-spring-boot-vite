import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface BackButtonProps {
  classValue?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ classValue = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      className={cn("transition-colors", classValue)}
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};

export default BackButton;
