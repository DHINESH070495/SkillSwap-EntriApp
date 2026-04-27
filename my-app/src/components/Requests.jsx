import { useEffect, useState } from "react";
import axios from "axios";

function Requests() {

  const API = "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {
      setUsers(res.data);

      const me = res.data.find((u) => u.id === currentUser.id);
      setRequests(me.requests || []);
    });
  }, []);

  // 🔹 Get user details from ID
  const getUser = (id) => users.find((u) => u.id === id);

  // ACCEPT REQUEST
  const acceptRequest = async (senderId) => {
    try {
      const res = await axios.get(`${API}/${currentUser.id}`);
      const me = res.data;

      const updatedRequests = (me.requests || []).filter(
        (id) => id !== senderId
      );

      const updatedConnections = [
        ...(me.connections || []),
        senderId,
      ];

      await axios.put(`${API}/${currentUser.id}`, {
        ...me,
        requests: updatedRequests,
        connections: updatedConnections,
      });

      // 🔹 Also update sender (add connection)
      const senderRes = await axios.get(`${API}/${senderId}`);
      const sender = senderRes.data;

      await axios.put(`${API}/${senderId}`, {
        ...sender,
        connections: [...(sender.connections || []), currentUser.id],
      });

      setRequests(updatedRequests);

      alert("Request accepted ");
    } catch (error) {
      console.error(error);
    }
  };

  // REJECT REQUEST
  const rejectRequest = async (senderId) => {
    try {
      const res = await axios.get(`${API}/${currentUser.id}`);
      const me = res.data;

      const updatedRequests = (me.requests || []).filter(
        (id) => id !== senderId
      );

      await axios.put(`${API}/${currentUser.id}`, {
        ...me,
        requests: updatedRequests,
      });

      setRequests(updatedRequests);

      alert("Request rejected ");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Received Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-500 text-center">
          No requests 
        </p>
      )}

      <div className="space-y-4">
        {requests.map((id) => {
          const user = getUser(id);
          if (!user) return null;

          return (
            <div
              key={id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => acceptRequest(id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>

                <button
                  onClick={() => rejectRequest(id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests;