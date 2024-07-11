"use client";
import axios from "axios";
import { useEffect, useState } from "react";
/**
 * Renders a list of items fetched from a database.
 *
 * @returns The rendered HTML elements that display the fetched data in a list format.
 */

export default function Home() {
  const role = "customer";
  const validRoles = ["admin", "customer"];

  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const [result, setResult] = useState<
    { id: string; name: string; role: string }[]
  >([]);
  const [usersByRole, setUsersByRole] = useState<
    { id: string; name: string; role: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await axios.get("/api/users");
      //   setResult(response.data);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      fetch("/api/users", {
        method: "GET",
        // headers: {
        //   "User-Agent": "insomnia/9.3.2",
        // },
      })
        .then((response) => {
          return response.json().then((data) => {
            setResult(data);
          });
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataByRole = async () => {
      try {
        const response = await axios.post(`/api/users`, { role });
        setUsersByRole(response.data);
      } catch (error) {
        console.error("Error fetching data by role:", error);
      }
    };

    fetchDataByRole();
  }, [role]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="p-3">All Users</h2>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <table className="w-full border-separate border-spacing-2 border border-slate-400 text-left">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr
                key={item.id}
                className={`border pl-1 border-slate-300 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="p-3">Users By Role</h2>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <table className="w-full border-separate border-spacing-2 border border-slate-400 text-left">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {usersByRole.map((item, index) => (
              <tr
                key={item.id}
                className={`border pl-1 border-slate-300 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
