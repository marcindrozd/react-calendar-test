Rails.application.routes.draw do
  resource :appointments

  root 'appointments#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
