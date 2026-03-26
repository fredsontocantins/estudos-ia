from sqlalchemy import Column, Date, Integer, String, Text

from database import Base


class Homologacao(Base):
    __tablename__ = "homologacoes"

    id = Column(Integer, primary_key=True, index=True)
    cliente = Column(String(150), nullable=False)
    modulo = Column(String(100), nullable=False)
    descricao = Column(Text, nullable=False)
    responsavel = Column(String(100), nullable=True)
    status = Column(String(50), nullable=False)
    prioridade = Column(String(20), nullable=False)
    data_abertura = Column(Date, nullable=True)
    data_check = Column(Date, nullable=True)
    data_conclusao = Column(Date, nullable=True)
    versao = Column(String(20), nullable=True)
    observacoes = Column(Text, nullable=True)
