import React from 'react';

export default function Cat() {
  React.useEffect(() => {
    console.log("homepage");
  }, []);

  return (
    <div>
        Yes
    </div>
  );
}
