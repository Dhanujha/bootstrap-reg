import React from "react";

function Heading({ heading }: { heading: string }) {
  return <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">{heading}</h3>;
}

export default Heading;
