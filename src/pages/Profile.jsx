import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, MapPin, Briefcase } from "lucide-react";

const DetailCard = ({ icon: Icon, label, value = "N/A" }) => {
  return (
    <div
      style={{ boxShadow: "0px 4px 8px 0px #0000001F" }}
      className="flex flex-col sm:flex-row justify-between rounded-[12px] px-[16px] sm:px-[24px] py-[12px] gap-[12px] bg-white items-start sm:items-center"
    >
      <div className="flex gap-[12px] items-center">
        <Icon className="w-5 h-5 text-blue-600" />
        <div className="flex flex-col gap-[4px] font-[Inter]">
          <p className="text-[12px] leading-[16px] text-blue-900 font-medium">
            {label}
          </p>
          <p className="text-[14px] md:text-[16px] leading-[24px] text-gray-800 font-normal">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mockUser = {
      firstName: "Tanishtha",
      lastName: "Mahajan",
      email: "tanishtha@example.com",
      phone: "+91 9876543210",
      dob: "10 Jan 2000",
      address: "Chandigarh, India",
      position: "Designer",
      department: "Team",
    };
    setUser(mockUser);
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  const personalDetails = [
    { icon: Calendar, label: "Date of Birth", value: user.dob },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone },
    { icon: MapPin, label: "Address", value: user.address },
  ];

  const jobDetails = [
    { icon: Briefcase, label: "Position", value: user.position },
    { icon: User, label: "Department", value: user.department },
  ];

  return (
    <div className="mx-auto bg-[#E9EEF4] flex flex-col gap-8 min-h-screen font-[Inter]">
      <div className="flex flex-col px-4 mt-6">
        
        <div className=" top-10 w-full h-[64px] bg-gradient-to-r from-[#04203E] to-[#06345f] rounded-[12px] px-[24px] py-[18px] flex items-center shadow-md">
          <div className="text-white font-bold text-[20px] md:text-[24px]">
            User Profile
          </div>
        </div>

        <div className="w-full h-auto bg-gradient-to-r from-[#04203E] to-[#06345f] rounded-[12px] mt-[25px] p-[24px] flex items-center gap-[20px] shadow-md">
          <div className="w-[80px] h-[80px] md:w-[96px] md:h-[96px] rounded-full bg-white flex items-center justify-center text-blue-900 text-3xl font-bold">
            {user.firstName.charAt(0)}
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="text-white font-bold text-[22px]">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-white text-[16px]">
              {user.position} – {user.department}
            </div>
          </div>
        </div>

     
        <div className="w-full h-[52px] bg-gradient-to-r from-[#04203E] to-[#06345f] rounded-t-[12px] p-[12px] mt-[24px] flex items-center shadow">
          <div className="text-white font-semibold text-[18px]">
            Personal Details
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[20px] bg-white rounded-b-[12px] p-5 mb-5">
          {personalDetails.map((detail, idx) => (
            <DetailCard key={idx} {...detail} />
          ))}
        </div>

      
        <div className="w-full h-[52px] bg-gradient-to-r from-[#04203E] to-[#06345f] rounded-t-[12px] p-[12px] mt-[24px] flex items-center shadow">
          <div className="text-white font-semibold text-[18px]">
            Profile Details
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[20px] bg-white rounded-b-[12px] p-5 mb-5">
          {jobDetails.map((detail, idx) => (
            <DetailCard key={idx} {...detail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;