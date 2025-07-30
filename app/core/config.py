from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Home Inventory API"
    admin_email: str = "admin@example.com"

    database_url: str = "postgresql+psycopg2://user:password@localhost/inventorydb"
    database_test_url: str = "postgresql+psycopg2://user:password@localhost/inventorydb_test"

    secret_key: str = "supersecretkey" 
    log_level: str = "INFO"

    class Config:
        env_file = ".env"


settings = Settings()
