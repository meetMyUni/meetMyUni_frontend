
import { useState } from "react";
import MBBSHero from "./MBBSHero";
import MBBSColleges from "./MBBSColleges";
import MBBSPopup from "./MBBSPopup";

function MBBSPage() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      <MBBSHero />

      <MBBSColleges
        onViewDetails={() => setShowPopup(true)}
      />

      {showPopup && (
        <MBBSPopup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}

export default MBBSPage;
