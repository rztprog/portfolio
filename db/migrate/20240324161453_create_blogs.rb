class CreateBlogs < ActiveRecord::Migration[7.1]
  def change
    create_table :blogs do |t|

      t.timestamps
    end
  end
end
