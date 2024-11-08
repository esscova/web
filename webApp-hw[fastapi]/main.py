from fastapi import FastAPI, UploadFile
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from datetime import datetime
from pathlib import Path
from aiofile import async_open
from uuid import uuid4


app = FastAPI()
templates = Jinja2Templates(directory='templates')
app.mount('/static', StaticFiles(directory='static'), name='static')
app.mount('/media', StaticFiles(directory='media'), name='media')
media = Path('media')


@app.get('/')
async def index(request:Request, horas:datetime=datetime.now()):
    context = {
        'request':request,
        'hora':horas
    }
    return templates.TemplateResponse('index.html', context=context)

@app.post('/servicos')
async def servicos(request:Request):
    form = await request.form()
    servico:str = form.get('servico')
    arquivo:UploadFile = form.get('arquivo')

    arquivo_ext:str = arquivo.filename.split('.')[1]
    nome_arquivo:str = f'{str(uuid4())}.{arquivo_ext}'

    context = {
        'request':request,
        'imagem':nome_arquivo
    }

    async with async_open(f'{media}/{nome_arquivo}', 'wb') as file:
        await file.write(arquivo.file.read())

    return templates.TemplateResponse('index.html', context=context)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', log_level='info', port=8000, reload=True)