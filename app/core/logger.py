import logging
from app.core.config import settings

# Create a logger instance
logger = logging.getLogger(settings.app_name)
logger.setLevel(getattr(logging, settings.log_level.upper(), logging.INFO))

# Create console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(getattr(logging, settings.log_level.upper(), logging.INFO))

# Create formatter
formatter = logging.Formatter(
    '[%(asctime)s] [%(levelname)s] %(name)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
console_handler.setFormatter(formatter)

# Add handler to logger if not already added
if not logger.handlers:
    logger.addHandler(console_handler)
