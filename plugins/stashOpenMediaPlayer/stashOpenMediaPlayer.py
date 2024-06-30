import json
import log
import sys
import subprocess
from urllib.parse import unquote

json_input = json.loads(sys.stdin.read())
name = json_input['args']['name']

if name == 'mediaplayer':
    mediaplayer_path = json_input['args']['mediaPlayerPath']
    path = json_input['args']['path']
    path = decoded_uri = unquote(path)
    if path.startswith('file:///'):
        path = path.lstrip('file:///')
    log.debug(f"mediaplayer_path: {mediaplayer_path}")
    log.debug(f"{name}: {path}")
    subprocess.Popen([mediaplayer_path, path])
