#Application for running|editing a scripts placed on the server.

### Usage

__Download__

```commandline
git clone git@bitbucket.org:addovejHome/script-runner.git
cd script-runner
```

__Build web__

```commandline
cd templates/static
npm install
npm run build
```

__Configuration__

In the configuration.py file you can edit a main app config:
ROOT_PATH - a root path where placed main scripts (default '/home/ctco/rootfolder')
LOG_FILE - a log file which will store all running logs (default '/home/ctco/rootfolder/log.txt')
EXEC_FILE_EXT - an extensions of files in the root path which will be display in a web file manager (default ['py', 'sh'])

__Build && Launch back__

```commandline
python3 -m pip install --user --upgrade pip
python3 -m pip install --user virtualenv
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
