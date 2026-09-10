import { useNavigate } from "react-router-dom";

function CareerDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-700"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-gray-800">
          Software Developer
        </h1>

        <p className="text-green-600 font-bold text-2xl mt-4">
          92% Match
        </p>

        <p className="text-gray-600 mt-4">
          Software developers build and maintain software applications
          using programming and problem-solving skills.
        </p>

        <button
          onClick={() => navigate("/skills-you-need")}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
        >
          View Skills You Need →
        </button>
      </div>
    </div>
  );
}

export default CareerDetails;