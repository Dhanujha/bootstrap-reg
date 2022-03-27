import React from "react";

function Heading({ heading }: { heading: string }) {
  return <h3 className="mb-4 pb-1 pb-md-0 mb-md-3">{heading}</h3>;
}

export default Heading;
