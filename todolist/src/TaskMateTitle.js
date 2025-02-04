import React from "react";
import "./TaskMateTitle.css"; // Make sure to import the CSS

const TaskMateTitle = () => {
  return (
    <div className="taskmate-title-container">
      <h1 className="taskmate-title">
        TaskMate <span className="tagline">Your Personal Task Companion</span>
      </h1>
    </div>
  );
};

export default TaskMateTitle;
