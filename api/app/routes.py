from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from database import SessionLocal
from schemas import HomologacaoCreate, HomologacaoOut, HomologacaoUpdate

router = APIRouter(prefix="/homologacoes", tags=["homologacoes"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("", response_model=HomologacaoOut, status_code=201)
def criar(homologacao: HomologacaoCreate, db: Session = Depends(get_db)):
    nova = models.Homologacao(**homologacao.model_dump())
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova


@router.get("", response_model=list[HomologacaoOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Homologacao).order_by(models.Homologacao.id.desc()).all()


@router.put("/{homologacao_id}", response_model=HomologacaoOut)
def atualizar(homologacao_id: int, dados: HomologacaoUpdate, db: Session = Depends(get_db)):
    item = db.query(models.Homologacao).filter(models.Homologacao.id == homologacao_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Homologação não encontrada")

    for key, value in dados.model_dump(exclude_unset=True).items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item
