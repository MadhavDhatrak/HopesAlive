const ConfirmationModal = ({ isOpen, onClose, onConfirm, incidentDetails }) => {
    if (!isOpen) return null;
     return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Confirm Assignment</h3>
          <p className="mb-4">Are you sure you want to assign yourself to this incident?</p>
          
          {incidentDetails && (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p><strong>Location:</strong> {incidentDetails.location?.address || 'N/A'}</p>
              <p><strong>Description:</strong> {incidentDetails.animalInfo?.description || 'N/A'}</p>
              <p><strong>Severity:</strong> {incidentDetails.animalInfo?.aiSeverityAssessment?.category || 'N/A'}</p>
            </div>
          )}
           <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Confirming assignment for incident:", incidentDetails?._id); // Debug log
                onConfirm();
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    );
   };
   export default ConfirmationModal;