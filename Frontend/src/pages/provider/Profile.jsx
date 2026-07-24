import React, { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import api from "../../api/api"; // path apne project ke hisab se adjust kar lena

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    experience: "",
    city: "",
    state: "",
    bio: "",
    trade: "",
    pricePerHour: "",
    skills: [],
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/providers/me");
          
   
const provider = data.data.provider;

// First time provider profile
if (!provider) {
  setLoading(false);
  return;
}

setFormData({
  fullName: provider.user?.name || "",
  phone: provider.user?.mobile || "",
  experience: provider.experience || "",
  city: provider.city || "",
  state: provider.state || "",
  bio: provider.bio || "",
  trade: provider.trade || "",
  pricePerHour: provider.pricePerHour || "",
  skills: provider.skills || [],
  profileImage: provider.profileImage || "",
});

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter((item) => item !== skill),
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };



  const handleSave = async () => {
    try {
      setSaving(true);

    await api.put("/providers/me", {
  fullName: formData.fullName,
  phone: formData.phone,
  trade: formData.trade,
  bio: formData.bio,
  experience: Number(formData.experience),
  city: formData.city,
  state: formData.state,
  pricePerHour: Number(formData.pricePerHour),
  skills: formData.skills,
  profileImage: formData.profileImage,
});

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Provider Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Complete your profile to start receiving bookings.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Profile Image */}
        <div className="mb-10 flex flex-col items-center">
          <div className="relative">
            <img
              src={
                formData.profileImage ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(formData.fullName || "Provider")
              }
              alt="profile"
              className="h-32 w-32 rounded-full object-cover"
            />

            <button
              className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-3 text-white"
            >
              <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Basic Details */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Experience
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Trade
            </label>

            <select
              name="trade"
              value={formData.trade}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 p-3"
            >
              <option value="">Select Trade</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>AC Technician</option>
              <option>Painter</option>
              <option>Carpenter</option>
              <option>Cleaner</option>
              <option>Appliance Repair</option>
              <option>Bathroom Fitter</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 p-3"
            />
          </div>

        </div>

        {/* About */}

        <div className="mt-8">

          <label className="mb-2 block font-medium">
            About
          </label>

          <textarea
            rows={5}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 p-3"
          />

        </div>

        {/* Skills */}

        <div className="mt-8">

          <label className="mb-3 block font-medium">
            Skills
          </label>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

            {[
              "Fan Installation",
              "Wiring",
              "Switch Board Repair",
              "AC Installation",
              "Pipe Fitting",
              "Leakage Repair",
            ].map((skill) => (
              <label
                key={skill}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 p-3"
              >
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />

                {skill}
              </label>
            ))}

          </div>

        </div>

        {/* Pricing */}

        <div className="mt-8">

          <label className="mb-2 block font-medium">
            Hourly Charge (₹)
          </label>

          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 p-3"
          />

        </div>

        {/* Save */}

        <div className="mt-10">

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={20} />

            {saving ? "Saving..." : "Save Profile"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;