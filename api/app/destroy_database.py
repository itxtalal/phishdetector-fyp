from app.db import Base, engine

Base.metadata.drop_all(engine)
