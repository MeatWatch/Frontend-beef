// import React, { useState } from "react";
// import { FiBell, FiClock, FiCalendar } from "react-icons/fi";

// const Reminder = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [reminderTime, setReminderTime] = useState("");

//   const handleSetReminder = () => {
//     // Logic to set reminder
//     alert(`Reminder set for: ${reminderTime}`);
//     setIsOpen(false);
//     setReminderTime("");
//   };

//   return (
//     <div className="fixed bottom-6 right-6">
//       {isOpen && (
//         <div className="bg-white p-4 rounded-xl shadow-xl mb-4 w-64">
//           <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
//             <FiBell className="mr-2" /> Set Reminder
//           </h3>
//           <div className="mb-3">
//             <label className="block text-sm text-gray-600 mb-1">
//               Reminder Time
//             </label>
//             <div className="relative">
//               <input
//                 type="datetime-local"
//                 value={reminderTime}
//                 onChange={(e) => setReminderTime(e.target.value)}
//                 className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//               <FiCalendar className="absolute right-3 top-3 text-gray-400" />
//             </div>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSetReminder}
//               className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Set
//             </button>
//           </div>
//         </div>
//       )}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center"
//       >
//         <FiClock size={24} />
//       </button>
//     </div>
//   );
// };

// export default Reminder;
