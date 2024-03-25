# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Cleaning all DB model
puts "Cleaning database..."
Blog.destroy_all
puts "=============================="

# Create Blog article
puts "Creating some blog article..."

Blog.new(title: "Hello", post: "Friend").save
Blog.new(title: "Elliot", post: "Alderson").save
Blog.new(title: "Mr Robot", post: "is Here").save

puts "Congrats, #{Blog.count} blog article(s) were created!"
puts "=============================="
