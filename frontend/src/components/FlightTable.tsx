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

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase"
                  >
                    Flight Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase"
                  >
                    Update Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((flight, index) => (
                  <tr className="hover:bg-gray-100" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {flight.flight_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {flight.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {flight.update_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {flight.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTable;
