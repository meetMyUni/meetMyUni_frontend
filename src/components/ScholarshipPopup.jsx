
import ScholarshipForm from "./ScholarshipForm";

function ScholarshipPopup({ onClose }) {
  return (
    <div
      className="popup-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="popup-box">
        <button
          className="close-popup"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <ScholarshipForm onSuccess={onClose} />
      </div>
    </div>
  );
}

export default ScholarshipPopup;