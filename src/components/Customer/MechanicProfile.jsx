import { X, Star, Phone } from "lucide-react";

export default function MechanicProfileModal({ mechanic, onClose }) {
  if (!mechanic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="
        relative
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-2xl
        overflow-hidden
        animate-scaleIn
      ">
        {/* Header */}
        <div className="bg-yellow-500 px-5 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">
            Mechanic Profile
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-yellow-500 text-3xl font-bold">
              {mechanic.fullName.charAt(0)}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-black">
              {mechanic.fullName}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex justify-center items-center gap-2">
            <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
            <span className="font-medium text-black">
              {mechanic.rating || 0}
            </span>
            <span className="text-gray-500 text-sm">
              ({mechanic.totalRatings || 0} reviews)
            </span>
          </div>

          {/* Specialties */}
          <div>
            <p className="font-semibold text-black mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {mechanic.specialties.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-yellow-100 text-black text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 text-black">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{mechanic.phone}</span>
            </div>
            <a
              href={`tel:${mechanic.phone}`}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
