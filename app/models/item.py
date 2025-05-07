from sqlalchemy import Column, Integer, String, Date, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    barcode = Column(String, unique=True, nullable=True)
    purchase_date = Column(Date)
    value = Column(Numeric(10, 2))
    category_id = Column(Integer, ForeignKey("categories.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
    condition_id = Column(Integer, ForeignKey("conditions.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))

    category = relationship("Category")
    location = relationship("Location")
    condition = relationship("Condition")
    owner = relationship("User")

    def __repr__(self):
        return (f"<Item(id={self.id}, name='{self.name}', barcode='{self.barcode}', "
                f"value={self.value}, owner_id={self.owner_id})>")
