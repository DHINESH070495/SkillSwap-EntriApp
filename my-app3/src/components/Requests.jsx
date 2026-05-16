import { useEffect, useState } from "react";
import axios from "axios";
import {
  Check,
  X,
  Mail,
  User,
  Bell,
  Sparkles,
} from "lucide-react";

function Requests() {

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [requests, setRequests] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    axios.get(API).then((res) => {

      setUsers(res.data);

      const me =
        res.data.find(
          (u) =>
            u.id === currentUser.id
        );

      setRequests(
        me.requests || []
      );

    });

  }, []);

  // 🔹 Get user details
  const getUser = (id) =>
    users.find((u) => u.id === id);

  // ACCEPT REQUEST
  const acceptRequest =
    async (senderId) => {

      try {

        const res =
          await axios.get(
            `${API}/${currentUser.id}`
          );

        const me = res.data;

        const updatedRequests =
          (me.requests || []).filter(
            (id) =>
              id !== senderId
          );

        const updatedConnections =
          [
            ...(me.connections || []),
            senderId,
          ];

        await axios.put(
          `${API}/${currentUser.id}`,
          {
            ...me,
            requests:
              updatedRequests,
            connections:
              updatedConnections,
          }
        );

        // 🔹 Update sender
        const senderRes =
          await axios.get(
            `${API}/${senderId}`
          );

        const sender =
          senderRes.data;

        await axios.put(
          `${API}/${senderId}`,
          {
            ...sender,
            connections: [
              ...(sender.connections || []),
              currentUser.id,
            ],
          }
        );

        setRequests(
          updatedRequests
        );

        alert(
          "Request accepted"
        );

      }
      catch (error) {

        console.error(error);

      }

    };

  // REJECT REQUEST
  const rejectRequest =
    async (senderId) => {

      try {

        const res =
          await axios.get(
            `${API}/${currentUser.id}`
          );

        const me = res.data;

        const updatedRequests =
          (me.requests || []).filter(
            (id) =>
              id !== senderId
          );

        await axios.put(
          `${API}/${currentUser.id}`,
          {
            ...me,
            requests:
              updatedRequests,
          }
        );

        setRequests(
          updatedRequests
        );

        alert(
          "Request rejected"
        );

      }
      catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

              <Sparkles size={30} />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-800">

                Connection Requests

              </h1>

              <p className="text-gray-500 mt-1">

                Manage your incoming collaboration requests

              </p>

            </div>

          </div>

        </div>

        {/* EMPTY STATE */}

        {requests.length === 0 && (

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-12 text-center">

            <div className="mx-auto h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">

              <Bell size={36} />

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">

              No Requests Yet

            </h2>

            <p className="text-gray-500 mt-2">

              When someone sends you a collaboration request,
              it will appear here.

            </p>

          </div>

        )}

        {/* REQUEST LIST */}

        <div className="grid gap-6">

          {requests.map((id) => {

            const user =
              getUser(id);

            if (!user)
              return null;

            return (

              <div
                key={id}
                className="bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-[1.01] transition duration-300"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* USER INFO */}

                  <div className="flex items-center gap-4">

                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">

                      {user.name?.charAt(0)}

                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">

                        <User size={18} />

                        {user.name}

                      </h2>

                      <p className="text-gray-500 flex items-center gap-2 mt-1">

                        <Mail size={16} />

                        {user.email}

                      </p>

                      {user.role && (

                        <span className="inline-block mt-3 bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium">

                          {user.role}

                        </span>

                      )}

                    </div>

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        acceptRequest(id)
                      }
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
                    >

                      <Check size={18} />

                      Accept

                    </button>

                    <button
                      onClick={() =>
                        rejectRequest(id)
                      }
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
                    >

                      <X size={18} />

                      Reject

                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}

export default Requests;