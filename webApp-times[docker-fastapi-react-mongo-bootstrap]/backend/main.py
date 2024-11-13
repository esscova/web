from fastapi import FastAPI
from routes.jogador import router
from fastapi.middleware.cors import CORSMiddleware

cliente_app = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]
app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cliente_app,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)