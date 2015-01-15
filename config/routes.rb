Rails.application.routes.draw do

  resources :characters, only:
    [:index, :show, :create, :update, :destroy]

end
