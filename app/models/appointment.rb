class Appointment < ApplicationRecord
  validates :title, presence: true
  validates :appt_time, presence: true
  validates :title, length: { minimum: 3 }
  validate :appointment_cant_be_in_the_past

  private

  def appointment_cant_be_in_the_past
    if appt_time.present? && appt_time < Time.current
      errors.add(:appt_time, "can't be in the past")
    end
  end
end
