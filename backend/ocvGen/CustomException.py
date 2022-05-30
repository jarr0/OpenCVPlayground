class CustomFunctionException(Exception):
  def __init__(self, *args):
    if args:
      self.func_id = args[0]
      self.message = args[1]
    else:
      self.message = None
      
  def __str__(self):
    if self.message:
      return '{0},{1}'.format(self.func_id, self.message)
    # else:
    #   return 'Error has been rasied'