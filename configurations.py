class BaseCongig(object):
    '''
    Base config class
    '''
    DEBUG = True
    TESTING = False
    ROOT_PATH = '/home/addovej/rootfolder'


class ProductionConfig(BaseCongig):
    """
    Production specific config
    """
    DEBUG = False
    ROOT_PATH = '/home/addovej/rootfolder'


class DevelopmentConfig(BaseCongig):
    """
    Development environment specific configuration
    """
    DEBUG = True
    TESTING = True
    ROOT_PATH = '/home/addovej/rootfolder'
