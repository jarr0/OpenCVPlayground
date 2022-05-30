import sys
from generate import generate_code
# from code import run_script

# exec('from code import run_script')
# run_script()

try:
  
  
  generate_code()
  exec('from code import run_script')
  run_script()
except Exception as e:
  print(e)
  sys.exit(3)