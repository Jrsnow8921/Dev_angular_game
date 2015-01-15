class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string     :first_name
      t.string     :last_name
      t.string     :sex
      t.string     :race
      t.belongs_to :party

      t.timestamps
    end
  end
end
