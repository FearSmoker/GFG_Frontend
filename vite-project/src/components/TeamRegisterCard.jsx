import React, { useState } from "react";
import { X } from "lucide-react";
import { createTeam } from "../api/Team_api";
import toast from "react-hot-toast";

const TeamRegisterCard = ({ isOpen, onClose, user, onTeamCreated }) => {
  const [createStep, setCreateStep] = useState(1); // 1: Basic details, 2: Members
  const [loading, setLoading] = useState(false);

  // Team creation form state
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamSize: 2,
    description: "",
    leaderDetails: {
      mobile: user?.mobile || "",
      course: user?.course || "",
      year: user?.year || ""
    },
    members: []
  });

  const branches = [
    "B.Tech Civil Engineering",
    "B.Tech Mechanical Engineering", 
    "B.Tech Electrical Engineering",
    "B.Tech Electronics Engineering",
    "B. Architecture",
    "B.Tech Computer Science & Engineering",
    "B.Tech Chemical Engineering",
    "B.Tech Information Technology",
    "B.Tech Electronics & Telecommunication Engineering",
    "B.Tech Information Technology (Artificial Intelligence and Robotics)",
    "B.Tech Internet of Things (IoT)",
    "B.Tech Mathematics and Computing",
    "B.Tech Artificial Intelligence (AI) and Data Science",
    "B.Tech Artificial Intelligence and Machine Learning",
    "B.Tech Computer Science and Design",
    "B.Tech Computer Science & Business Systems",
    "B.Tech Artificial Intelligence (AI)",
    "B.Tech Computer Science and Technology",
    "B.Tech Electrical and Computer Engineering",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (createStep === 1) {
      // Validate step 1 data
      if (!teamData.teamName || teamData.teamSize < 2 || teamData.teamSize > 5) {
        toast.error("Please fill all required fields correctly");
        return;
      }

      // Check if leader details are complete
      const { mobile, course, year } = teamData.leaderDetails;
      if (!mobile || !course || !year) {
        toast.error("Please complete all your profile details to create a team");
        return;
      }

      // Initialize members array for step 2
      const membersArray = Array.from({ length: teamData.teamSize - 1 }, () => ({
        username: "",
        email: ""
      }));
      
      setTeamData(prev => ({ ...prev, members: membersArray }));
      setCreateStep(2);
      return;
    }

    // Step 2 - Submit team creation
    try {
      setLoading(true);
      
      // Validate members data - each member must have either username or email
      const validMembers = [];
      
      for (let i = 0; i < teamData.members.length; i++) {
        const member = teamData.members[i];
        
        // Each member must have either username or email (but not both required)
        if (!member.username.trim() && !member.email.trim()) {
          toast.error(`Please provide either name or email/username for Member ${i + 1}`);
          return;
        }
        
        // Create member object with proper field mapping
        const memberData = {};
        if (member.username.trim()) {
          memberData.username = member.username.trim();
        }
        if (member.email.trim()) {
          memberData.email = member.email.trim();
        }
        
        validMembers.push(memberData);
      }

      if (validMembers.length !== teamData.teamSize - 1) {
        toast.error(`Please add exactly ${teamData.teamSize - 1} team members`);
        return;
      }

      // Prepare payload according to backend API structure
      const payload = {
        teamName: teamData.teamName.trim(),
        teamSize: teamData.teamSize,
        description: teamData.description.trim(),
        members: validMembers,
        leaderDetails: {
          mobile: teamData.leaderDetails.mobile.trim(),
          course: teamData.leaderDetails.course,
          year: teamData.leaderDetails.year
        }
      };


      const response = await createTeam(payload);
      
      if (response?.success || response?.data) {
        toast.success("Team created successfully! Invitations sent to members.");
        handleClose();
        if (onTeamCreated) {
          onTeamCreated();
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Team creation error:", error);
      
      // More specific error messages based on status codes
      if (error.response?.status === 400) {
        // Handle validation errors
        if (error.response.data?.errors) {
          const errorMessages = error.response.data.errors.map(err => err.message || err).join(", ");
          toast.error(`Validation errors: ${errorMessages}`);
        } else {
          toast.error(error.message || "Invalid data provided. Please check all fields.");
        }
      } else if (error.response?.status === 409) {
        toast.error("Team name already exists. Please choose a different name.");
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to create teams.");
      } else {
        toast.error(error.message || "Failed to create team. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCreateStep(1);
    setTeamData({
      teamName: "",
      teamSize: 2,
      description: "",
      leaderDetails: {
        mobile: user?.mobile || "",
        course: user?.course || "",
        year: user?.year || ""
      },
      members: []
    });
    onClose();
  };

  const updateMemberField = (index, field, value) => {
    setTeamData(prev => ({
      ...prev,
      members: prev.members.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
            Create New Team {createStep === 2 && "- Add Members"}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {createStep === 1 ? (
            <>
              {/* Step 1: Basic Team Details */}
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter team name"
                  value={teamData.teamName}
                  onChange={(e) => setTeamData(prev => ({ ...prev, teamName: e.target.value }))}
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  disabled={loading}
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-2">
                  Team Size *
                </label>
                <select
                  required
                  value={teamData.teamSize}
                  onChange={(e) => setTeamData(prev => ({ ...prev, teamSize: parseInt(e.target.value) }))}
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  disabled={loading}
                >
                  <option value={2}>2 Members</option>
                  <option value={3}>3 Members</option>
                  <option value={4}>4 Members</option>
                  <option value={5}>5 Members</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of your team (optional)"
                  value={teamData.description}
                  onChange={(e) => setTeamData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  maxLength={200}
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                  disabled={loading}
                />
                <p className="text-gray-400 text-xs mt-1">{teamData.description.length}/200 characters</p>
              </div>

              {/* Leader Details Section */}
              <div className="border-t border-gray-600/50 pt-4 mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Leader Details (Your Info)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter 10-digit mobile number"
                      value={teamData.leaderDetails.mobile}
                      onChange={(e) => setTeamData(prev => ({
                        ...prev,
                        leaderDetails: { ...prev.leaderDetails, mobile: e.target.value }
                      }))}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-2">
                      Course *
                    </label>
                    <select
                      required
                      value={teamData.leaderDetails.course}
                      onChange={(e) => setTeamData(prev => ({
                        ...prev,
                        leaderDetails: { ...prev.leaderDetails, course: e.target.value }
                      }))}
                      className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                      disabled={loading}
                    >
                      <option value="">Select course</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch} className="bg-gray-700 text-white">
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-xs font-medium mb-2">
                      Year *
                    </label>
                    <select
                      required
                      value={teamData.leaderDetails.year}
                      onChange={(e) => setTeamData(prev => ({
                        ...prev,
                        leaderDetails: { ...prev.leaderDetails, year: e.target.value }
                      }))}
                      className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                      disabled={loading}
                    >
                      <option value="">Select year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Add Members */}
              <div className="space-y-6">
                <div className="bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm border border-gray-600/30">
                  <h4 className="text-base font-semibold text-green-400 mb-2">Team: {teamData.teamName}</h4>
                  <p className="text-gray-300 text-sm">Add {teamData.teamSize - 1} team members below</p>
                </div>

                {teamData.members.map((member, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-4 backdrop-blur-sm border border-gray-600/20">
                    <h5 className="text-gray-400 font-medium mb-3">Team Member {index + 1}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-xs font-medium mb-2">
                          Username/Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter username or display name"
                          value={member.username}
                          onChange={(e) => updateMemberField(index, 'username', e.target.value)}
                          className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                          disabled={loading}
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-xs font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          value={member.email}
                          onChange={(e) => updateMemberField(index, 'email', e.target.value)}
                          className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      Provide either username or email (at least one is required)
                    </p>
                  </div>
                ))}

                <div className="bg-blue-900/20 rounded-xl p-4 backdrop-blur-sm border border-blue-500/20">
                  <h5 className="text-blue-400 font-medium mb-2">Important Notes:</h5>
                  <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>Members must be registered users on the platform</li>
                    <li>Invitations will be sent automatically after team creation</li>
                    <li>Members need to accept invitations and complete their profiles</li>
                    <li>Team will be verified once all members complete the process</li>
                    <li>You can search by either username or email address</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-600/50">
            <button
              type="button"
              onClick={() => {
                if (createStep === 2) {
                  setCreateStep(1);
                } else {
                  handleClose();
                }
              }}
              className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-500/30"
              disabled={loading}
            >
              {createStep === 2 ? "Back" : "Cancel"}
            </button>

            <button
              type="submit"
              className={`flex-1 font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                loading
                  ? "bg-gray-500/80 cursor-not-allowed text-gray-300 border border-gray-400/30"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/25"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-300 mr-2"></div>
                  {createStep === 2 ? "Creating Team..." : "Processing..."}
                </div>
              ) : createStep === 2 ? (
                "Create Team"
              ) : (
                "Next: Add Members"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamRegisterCard;