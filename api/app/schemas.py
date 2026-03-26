from datetime import date
from typing import Optional

from pydantic import BaseModel


class HomologacaoBase(BaseModel):
    cliente: str
    modulo: str
    descricao: str
    responsavel: Optional[str] = None
    status: str
    prioridade: str
    data_abertura: Optional[date] = None
    data_check: Optional[date] = None
    data_conclusao: Optional[date] = None
    versao: Optional[str] = None
    observacoes: Optional[str] = None


class HomologacaoCreate(HomologacaoBase):
    pass


class HomologacaoUpdate(BaseModel):
    cliente: Optional[str] = None
    modulo: Optional[str] = None
    descricao: Optional[str] = None
    responsavel: Optional[str] = None
    status: Optional[str] = None
    prioridade: Optional[str] = None
    data_abertura: Optional[date] = None
    data_check: Optional[date] = None
    data_conclusao: Optional[date] = None
    versao: Optional[str] = None
    observacoes: Optional[str] = None


class HomologacaoOut(HomologacaoBase):
    id: int

    class Config:
        from_attributes = True
