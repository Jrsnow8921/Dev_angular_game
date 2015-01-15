class CreateDungeons < ActiveRecord::Migration
  def change
    create_table :dungeons do |t|

      t.timestamps
    end
  end
end
