import React from "react";

interface IFlightStatus {
  flight_number: string;
  status: string;
  update_time: string;
  details: string;
}

interface FlightTableProps {
  data: IFlightStatus[] | null;
}

const FlightTable: React.FC<FlightTableProps> = ({ data }) => {
  if (!data) return null;

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "on time":
        return "text-green-500";
      case "cancelled":
        return "text-red-300";
      default:
        return "text-white";
    }
  };

  return (
    <>
      <p className="bg-sky-50 text-center text-3xl mx-80 rounded-lg">
        Flight Status Updates
      </p>
      <div className="relative overflow-x-auto mt-2 px-80">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100 rounded-lg overflow-hidden">
          <thead className="text-xs text-white uppercase bg-blue-900 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Flight Number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Update Time
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-500" : "bg-blue-600"
                } border-b border-blue-400`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {data.flight_number}
                </th>
                <td className={`px-6 py-4 ${getStatusClass(data.status)}`}>
                  {data.status}
                </td>
                <td className="px-6 py-4">{data.update_time}</td>
                <td className="px-6 py-4">{data.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FlightTable;
