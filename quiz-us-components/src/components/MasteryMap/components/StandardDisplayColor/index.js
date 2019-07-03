import React, { useState } from 'react';

export default function StandardDisplayColor({ score }) {
  // const { isHover, setHover } = useState(false);
  // console.log(isHover);
  const calculateColor = () => {
    switch (true) {
      case score > 80:
        return 'green';
      case score > 60:
        return 'orange';
      case score > 40:
        return 'yellow';
      case score > 20:
        return 'pink';
      case score >= 0:
        return 'red'
      case score === null:
        console.log(score)
        return 'grey';
      default:
        // console.log(score)
        return 'white';
    }
  }
  
  return (
    <div style={{ 'width': '100%', height: '100%', backgroundColor: calculateColor() }}>
      {score}
    </div>
  )
};