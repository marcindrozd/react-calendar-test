Rails.application.routes.draw do
  resource :appointments

  root 'appointments#index'
end
