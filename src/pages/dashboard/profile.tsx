import { Card, Avatar } from "antd";
import { useLayoutContext } from "../../contexts/layout.context";
import { Copy, University, UserRound } from "lucide-react";
import GenericLayout from "../../components/layouts/genericLayout";
import { toast } from "react-toastify";

const ProfilePage= () => {
  const { user } = useLayoutContext();

  const formatKey = (key: string): string => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const filteredProfileData = Object.entries(user || {}).filter(
    ([key]) => key !== "_id"
              && key !== "__v"
              && key !== "institution"
              && key !== 'privateKey'
              && key !== 'publicKey'
              && key !== 'userType'
  );

  const copyToClipboard = (text: string | number): void => {
    navigator.clipboard
      .writeText(String(text))
      .then(() => {
        toast.success("Text copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy text");
      });
  };

  return (
    <GenericLayout noFooter>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card
          className="w-full max-w-[80%] shadow-lg"
          cover={
            <div className="h-32 flex justify-center items-center">
              <Avatar className='text-primary bg-primary/30 w-20 h-20 cursor-pointer'>
                {
                  user?.userType === 'student'
                  ? <UserRound size={30} />
                  : <University size={30} />
                }
              </Avatar>
            </div>
          }
        >
          <h2 className="text-2xl font-bold text-center mb-4">Profile Details</h2>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              {filteredProfileData.map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <span className="font-semibold text-gray-700 w-1/3">
                    {key === 'dob' ? 'Date of Birth' : formatKey(key)}
                  </span>
                  <span className="text-gray-600 text-wrap">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
              <span className="font-semibold text-gray-700 w-1/3">
                Public Key
              </span>
              <div className="flex gap-2">
                <span className="text-gray-600 text-wrap">{user?.['publicKey']}</span>
                <Copy onClick={() => copyToClipboard(user?.['publicKey'] || "")} className="text-primary cursor-pointer" />
              </div>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
              <span className="font-semibold text-gray-700 w-1/3">
                Private Key
              </span>
              <div className="flex gap-2">
                <span className="text-gray-600 text-wrap">{user?.['privateKey']}</span>
                <Copy onClick={() => copyToClipboard(user?.['privateKey'] || "")} className="text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </GenericLayout>
  );
};

export default ProfilePage;
