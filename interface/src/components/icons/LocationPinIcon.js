import * as React from "react";

function LocationPin(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2a7.411 7.411 0 017.428 7.428c0 4.316-3.162 8.431-5.922 11.894-.803.904-2.209.904-2.961 0-2.811-3.463-5.973-7.578-5.973-11.894A7.411 7.411 0 0112 2zm0 3.463c2.208 0 4.015 1.757 4.015 3.965A4.027 4.027 0 0112 13.443c-2.208 0-3.965-1.807-3.965-4.015A3.941 3.941 0 0112 5.463z"
      />
    </svg>
  );
}

export default LocationPin;
