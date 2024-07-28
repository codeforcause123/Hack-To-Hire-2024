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
    <table>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Status</th>
          <th>Update Time</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((flight, index) => (
          <tr key={index}>
            <td>{flight.flight_number}</td>
            <td>{flight.status}</td>
            <td>{flight.update_time}</td>
            <td>{flight.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
