class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.order('appt_time DESC')
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.create(appointment_params)
    @appointments = Appointment.order('appt_time DESC')
  end

  private

  def appointment_params
    params.require(:appointment).permit(:title, :appt_time)
  end
end
