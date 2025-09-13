import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import { get_A_Password_Service, sanitizeKey, updatePassword_Service } from "../../Service/Password.service";
import { useSelector } from "react-redux";
import Loading from '../Loading/Loading.jsx'
import { FiEdit } from "react-icons/fi";
import Footer from "../Footer.jsx";
import { IoArrowBack } from "react-icons/io5"; 

const PasswordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [passwordData, setPasswordData] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [editedData, setEditedData] = useState({});

  const publicKey = useSelector((state) => sanitizeKey(state.publicKey));
  const privateKey = useSelector((state) => state.privateKey);

  useEffect(() => {
    const fetchPassword = async () => {
      const response = await get_A_Password_Service(id, publicKey, privateKey);
      if (response) {
        setPasswordData(response);
        setEditedData(response);
      } 
    };
    fetchPassword();
  }, []);


  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const data = { ...editedData, id };
    
      const updatedResponse = await updatePassword_Service(data);
      console.log(updatedResponse);
      setPasswordData(updatedResponse.data);
      setIsEditing({});
    
  };

  const fieldLabels = {
    websiteName: "Website Name",
    websiteURL: "Website URL",
    username: "Username",
    email: "Email",
    password: "Password",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col items-center">
      <Dashboard />
      <div className="relative flex-grow flex flex-col items-center w-full">
      <button
        onClick={() => navigate("/passwords")}  
        className="absolute top-6 left-6 flex items-center gap-2 bg-[#4D869C] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#7496a3]  transition-all transform hover:scale-105"
      >
        <IoArrowBack size={25} />
        
      </button>

      {passwordData ? (
        <div className="relative mt-12 bg-opacity-30 backdrop-blur-lg p-16 rounded-2xl shadow-xl border border-gray-300/40 w-[800px] text-center min-h-[500px] flex flex-col">
          <div className="bg-white/10 p-8 rounded-lg shadow-lg space-y-4 text-left flex flex-col flex-grow justify-between">
            {["websiteName", "websiteURL", "username", "email", "password"].map((field) => (
              <div key={field} className="flex items-center justify-between border-b border-gray-300/40 pb-2">
                <div className="flex-1">
                  <p className="text-lg">
                    <strong>{fieldLabels[field]} :</strong>{" "}
                    {isEditing[field] ? (
                      <input
                        type={field === "password" ? "password" : "text"}
                        value={editedData[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="ml-2 px-2 py-1 text-black text-lg rounded-md"
                      />
                    ) : (
                      <span>{passwordData[field]}</span>
                    )}
                  </p>
                </div>
                <button onClick={() => handleEditClick(field)} className="ml-3 text-gray-300 hover:text-white">
                <FiEdit className="text-gray-300 hover:text-white cursor-pointer" />
                </button>
              </div>
            ))}
          </div>

          {Object.values(isEditing).some((value) => value) && (
            <button
              onClick={handleSave}
              className="mt-4 bg-[#082d3c] hover:bg-[#81c3d7] shadow-lg shadow-[#082d3c]/50  text-white font-bold py-2 px-6 rounded-lg  w-full max-w-[800px]"
            >
              Save Changes
            </button>
          )}
        </div>
      ) : (
          <>
              <Loading/>
          </>
      )}
      </div>
      <Footer/>
    </div>
    
  );
};

export default PasswordDetail;
