import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { profileId } = useParams();
  return (
    <div>
      <h1>Profile {profileId}</h1>
    </div>
  );
}