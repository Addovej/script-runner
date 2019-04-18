class BaseCongig(object):
    '''
    Base config class
    '''
    DEBUG = True
    TESTING = False
    ROOT_PATH = '/home/ctco/rootfolder'


class ProductionConfig(BaseCongig):
    """
    Production specific config
    """
    DEBUG = False
    ROOT_PATH = '/home/ctco/rootfolder'


class DevelopmentConfig(BaseCongig):
    """
    Development environment specific configuration
    """
    DEBUG = True
    TESTING = True
    ROOT_PATH = '/home/ctco/rootfolder'
    CELERY_RESULT_BACKEND = 'test'
    CELERY_BROKER_URL = 'test'
    LOG_FILE = '/home/ctco/rootfolder/log.txt'
    EXEC_FILE_EXT = ['py', 'sh']
