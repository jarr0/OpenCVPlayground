import sys
from generate import generate_code

try:
  generate_code()
  exec('from temp.generated_code import run_script')
  run_script()
except Exception as e:
  print(e)
  sys.exit(3)