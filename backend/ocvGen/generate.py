import random
import string
import cv2 as cv
import json

function_template = [
  'def {}(img):\n',
  '\tfunc_id = \'{}\'\n',
  '\ttry:\n',
  '\t\t{}\n', 
  '\texcept Exception as e:\n', 
  '\t\traise ce.CustomFunctionException(func_id, e.args)\n\n', 
]

beginning = [
  'import sys\n',
  'import cv2 as cv\n',
  'import numpy as np\n',
  'import CustomException as ce\n\n',]

ending = [
  '\t\tcv.imwrite(\'./custom.jpg\', img)\n',
  '\texcept ce.CustomFunctionException as e:\n',
  '\t\tprint(e)\n',
  '\t\tsys.exit(1)\n',
  '\texcept Exception as e:\n',
  '\t\tsys.exit(2)\n\n',
]

# allows for future input types
img_src = [
  'InputArray',
]

# allows for future output types
img_dest = [
  'OutputArray'
]

def generate_code():
  fp = open('./ocvGen/code.py', 'a')
  fp.truncate(0)
  
  fp.writelines(beginning)
  
  with open('./ocvGen/data.json') as jsonFile:
    funcs = json.load(jsonFile)
    jsonFile.close()
        
  func_names = add_funcs(fp, funcs)
  
  fp.writelines([
    'def run_script():\n',
    '\timg = cv.imread(\'./base_image.jpg\')\n\n',
    '\ttry:\n',
  ])
  
  for func_name in func_names:
    fp.write('\t\t{0}(img)\n'.format(func_name))
    
  fp.writelines(ending)
    
def add_images(fp):
  fp.write("img = cv.imread('./image.jpg')\n\n")

def add_funcs(fp, funcs):
  internal_func_names = list()
    
  for func in funcs:
    final_func = function_template.copy()
    
    # while unlikly check for function name conflicts
    func_name = gen_internal_func_name()
    while func_name in internal_func_names:
      func_name = gen_internal_func_name()
    internal_func_names.append(func_name)

    
    formatted_func = generate_func(func)
    
    final_func[0] = final_func[0].format(func_name)
    final_func[1] = final_func[1].format(func['selected_id'])
    final_func[3] = final_func[3].format(formatted_func)

    fp.writelines(final_func)
  return internal_func_names      
  
def generate_func(func) -> str:
  formatted_func = 'cv.' + func['func_name'] + '('
  
  for param in func['signature']:
    var_type = param['var_type']
    
    if var_type in img_src or var_type in img_dest:
      formatted_func += '{0}={1}, '.format(param['param_name'], 'img')
    else:
      if 'default_value' not in param or param['value'] != None:
        formatted_func += '{0}={1}, '.format(param['param_name'], param['value'])
    
  return (formatted_func[:-2] + ')')
    
def gen_internal_func_name() -> str:
  return ''.join(random.choices(string.ascii_lowercase, k=10))

def add_functions(fp):
  with open('./ocvGen/data.json') as jsonFile:
    funcs = json.load(jsonFile)
    jsonFile.close
    
  for func in funcs:
    paramArgs = {
      "src": "img",
      "dst": "img",
    }
  
    params = func['signature']
    
    formatted_func = format_function(func)    
    
    for param in params:
      if 'default_value' not in param or param['value'] != None:
        paramArgs[param['param_name']] = param['value']
        
    fp.write(formatted_func.format(**paramArgs))
    
def format_function(func):
  formattable_func = 'cv.' + func['func_name'] + '('
  
  is_first = True
  for param in func['signature']:
    # filters out parameters that have a default value but no use set value 
    #   the user has not overriden the default parameter value
    if 'default_value' not in param or param['value'] != None:
      if not is_first:
        formattable_func += ", "

      is_first = False
      formattable_func += "%s={%s}" % (param['param_name'], param['param_name'])
    
  formattable_func += ")\n"
  
  return formattable_func
