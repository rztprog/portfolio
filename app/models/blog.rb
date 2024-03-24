class Blog < ApplicationRecord
    validates :title, uniqueness: true, presence: true
    validates :image, presence: true
    validates :post, presence: true
end
