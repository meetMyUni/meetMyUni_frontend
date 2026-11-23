
import MBBSForm from "./MBBSForm";

function MBBSPopup({ onClose }) {
  return (
    <div
      className="popup-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="popup-box mbbs-popup-box">
        <button
          className="close-popup mbbs-close-popup"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <MBBSForm onSuccess={onClose} />
      </div>
    </div>
  );
}

export default MBBSPopup;
