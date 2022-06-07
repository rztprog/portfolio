Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "pages#index"
  get "contact", to: "pages#contact"

  resources :blogs, only: [:index, :show, :create, :new, :edit, :update, :destroy]
end
