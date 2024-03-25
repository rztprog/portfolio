class AddFieldsToBlogs < ActiveRecord::Migration[7.1]
  def change
    add_column :blogs, :title, :string
    add_column :blogs, :post, :string
    add_column :blogs, :image, :string
  end
end
