RSpec::Matchers.define :each_have_key do |expected|
  match do |actual|
    ret = actual.all? { |x| x.key?(expected) }

    if @check_type && ret
      actual.map do |x|
        # There's no common ancestor of TrueClass and FalseClass below Object,
        # so we fake it: if the type is :boolean, we check if it's true or false.
        if @type == :boolean
          [true, false].include?(x[expected]).should be_true
        else
          x[expected].should be_a(@type)
        end
      end
    else
      ret
    end
  end

  chain :of_type do |type|
    @check_type = true
    @type = type
  end

  failure_message_for_should do |actual|
    msg = "expected #{actual.inspect} to each have key #{expected.inspect}"

    msg += " of type #{@type}" if @check_type

    msg
  end

  failure_message_for_should_not do |actual|
    msg = "expected #{actual.inspect} to each not have key #{expected.inspect}"

    msg += " of type #{@type}" if @check_type

    msg
  end
end

class Object
  # For `x.should be_array_of(y)`
  def array_of?(klass)
    self.is_a?(Array) && self.all? { |x| x.is_a?(klass) }
  end
end
