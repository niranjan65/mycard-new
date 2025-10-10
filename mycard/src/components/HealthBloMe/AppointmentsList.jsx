// AppointmentsList.jsx - Appointments List Component
import React from 'react';
import { Plus, Stethoscope, Calendar, Clock, MapPin, CheckCircle, XCircle, Download } from 'lucide-react';
import { handleDownloadPrescription } from './utils/downloadHelpers';

const AppointmentsList = ({ allAppointments, appointmentLoading, setShowAppointmentModal }) => {

  console.log("all appointment list.....", allAppointments)
  
  const handleDownload = (appointment) => {
    // Pass both appointment ID and invoice ID if available
    handleDownloadPrescription(appointment.appointmentId, appointment.refInvoice);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">All Appointments</h3>
        <button 
          onClick={() => setShowAppointmentModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {appointmentLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading appointments...</div>
          </div>
        ) : allAppointments && allAppointments.length > 0 ? (
          allAppointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {appointment.date}
                      <Clock className="w-4 h-4 ml-3 mr-1" />
                      {appointment.time}
                      {appointment.duration && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({appointment.duration} min)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {appointment.location}
                    </div>
                    <div className="mt-1">
                      <span className="text-xs text-gray-500 mr-2">Type: {appointment.appointmentType}</span>
                      {appointment.refInvoice && (
                        <span className="text-xs text-gray-500">Invoice: {appointment.refInvoice}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Closed' ? 'bg-green-100 text-green-700' :
                    appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                    appointment.status === 'Open' || appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700' :
                    appointment.status === 'No Show' ? 'bg-red-100 text-red-700' :
                    appointment.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {appointment.status === 'Closed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : 
                     appointment.status === 'No Show' ? <XCircle className="w-3 h-3 inline mr-1" /> :
                     appointment.status === 'Cancelled' ? <XCircle className="w-3 h-3 inline mr-1" /> :
                     <Clock className="w-3 h-3 inline mr-1" />}
                    {appointment.status}
                  </span>
                  {appointment.invoiced && (
                    <button
                      onClick={() => handleDownload(appointment)}
                      className="flex items-center px-2 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100 transition-colors"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;